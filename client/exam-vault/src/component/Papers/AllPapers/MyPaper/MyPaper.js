import axios from 'axios'
import React, { useEffect, useState } from 'react'
import classes from './MyPaper.module.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { deleteHandler, deletePaperHandler, editPaperHandler, viewHandler } from './MyPaperUtility'
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router'
import PaperTabular from '../PaperTabular'
import ImageUpload from '../ImageUpload'
import Pagination from '../Pagination/Pagination'
import MessageBox from '../../../MessageBox'

const MyPaper = () => {
  const [paperData, setPaperData] = useState([])
  const [userId, setUserId] = useState(null)
  const [approvedBy, setApprovedBy] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [paperId, setPaperId] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [modalContent, setModalContent] = useState({
    title: '',
    body: ''
  })

  const[searchParams,setSearchParams]=useSearchParams()

  const apiUrl = `${process.env.REACT_APP_APIURL}`

  useEffect(()=>{
        const pageFromParams=parseInt(searchParams.get("page") || "1")
        setCurrentPage(pageFromParams)
      },[searchParams])
    
  useEffect(() => {
    const token=sessionStorage.getItem("authToken")
    if(!token){
      navigate('/login_form')
    }
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUserId(user.uid)
        fetchData(user.uid)
      } else {
        console.error('User is not authenticated')
        setUserId(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const fetchData = async uid => {
    try {
      const response = await axios.get(`${apiUrl}/papers/my_paper`, {
        params: { uid: uid }
      })
      setPaperData(response.data)
      setLoading(false)
      if (response.data.approved_by !== 'undefined') {
        setApprovedBy(true)
      }
    } catch (error) {
      console.error('Error fetching papers:', error)
    }
  }

  if (location.pathname.includes('/view_paper')) {
    return <Outlet />;
  }

  const recordsPerPage = 12;
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage;
  const records = paperData.slice(firstIndex, lastIndex)
  const numberOfPages = Math.ceil(paperData.length / recordsPerPage)
  const numbers = [...Array(numberOfPages).keys()].map((n) => n + 1)

  return (
    <>
      {!userId && loading && (
        <div className="loading-backdrop">
          <div className="loading-box">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading your papers, please hold on....</div>
          </div>
        </div>
      )}
       {userId && paperData.length === 0 && !loading && (
      <div className={classes.noPaperMessage}>
        <p>You have not uploaded any papers yet. Please upload a paper first.</p>
        <button onClick={() => navigate('/upload_paper')} className={classes.uploadButton}>
          Upload Paper
        </button>
      </div>
    )}

      {userId  && paperData.length>0 && (
        <div className={classes.paperContainer}>
          {records.map((data, index) => (
            <div key={index} className={classes.paperCard}>
              <ImageUpload data={data} />
              <div className={classes.paperDetails}>
                <PaperTabular data={data} approvedBy={approvedBy} />
                <div>
                  <button onClick={() => viewHandler(data._id, navigate)} className={classes.Button}>View</button>
                  <button style={{ background: "rgb(255, 165, 0)" }} onClick={() => editPaperHandler(data._id, navigate)} className={classes.Button}>
                    Edit
                  </button>
                  <button style={{ background: "rgb(220, 53, 69)" }}
                    onClick={() => deleteHandler(data._id, setModalContent, setShowModal, setPaperId)}
                    className={classes.Button}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        title={modalContent.title}
        body={modalContent.body}
        handleConfirm={() => deletePaperHandler(paperId, setShowModal, modalContent, setPaperData)}
      />
      {!loading && paperData.length!==0 && (

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          numbers={numbers}
          onPageChange={(pageNum)=>{
            const params=new URLSearchParams(searchParams.toString())
            params.set("page",pageNum)
            setSearchParams(params)
          }}
        />
      )}
    </>
  )
}

export default MyPaper



