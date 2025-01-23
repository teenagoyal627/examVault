import axios from 'axios'
import React, { useEffect, useState } from 'react'
import classes from './MyPaper.module.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { deleteHandler, deletePaperHandler, editPaperHandler, viewHandler } from './MyPaperUtility'
import MessageBox from '../../MessageBox'
import { Outlet, useLocation, useNavigate } from 'react-router'
import PaperTabular from '../PaperTabular'
import ImageUpload from '../ImageUpload'
import { Pagination } from 'react-bootstrap'

const MyPaper = () => {
  const [paperData, setPaperData] = useState([])
  const [userId, setUserId] = useState(null)
  const [approvedBy, setApprovedBy] = useState(false)
  const[showModal,setShowModal]=useState(false)
  const[modalContent,setModalContent]=useState({
    title:'',
    body:''
  })
  const[paperId,setPaperId]=useState(null)
 const navigate=useNavigate()
 const location=useLocation()


 const apiUrl = `${process.env.REACT_APP_APIURL}`

  useEffect(() => {
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
      const response = await axios.get(`${apiUrl}/my_paper`, {
        params: { uid: uid }
      })
      setPaperData(response.data)
      console.log(response.data.approved_by)
      if (response.data.approved_by!=='undefined') {
        setApprovedBy(true)
      }
    } catch (error) {
      console.error('Error fetching papers:', error)
    }
  }

  if (location.pathname.includes('/view_paper')) {
    return <Outlet />;
  }

  return (
    <>
      {/* shoe loading indicator */}
      {!userId && <p>User is not login...</p>}
      {userId && (
        <div className={classes.paperContainer}>
          {paperData.map((data, index) => (
            <div key={index} className={classes.paperCard}>
              <ImageUpload data={data}/>
              <div className={classes.paperDetails}>
                <PaperTabular data={data} approvedBy={approvedBy}/>
                <div>
                  <button onClick={()=>viewHandler(data._id,navigate)} className={classes.Button}>View</button>
                  <button style={{background:"rgb(255, 165, 0)"}} onClick={()=>editPaperHandler(data._id,navigate)} className={classes.Button}>
                    Edit
                  </button>
                  <button style={{background:"rgb(220, 53, 69)"}}
                    onClick={()=>deleteHandler(data._id,setModalContent,setShowModal,setPaperId)}
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
  handleClose={()=>setShowModal(false)}
  title={modalContent.title}
  body={modalContent.body}
  handleConfirm={()=>deletePaperHandler(paperId,setShowModal,modalContent,setPaperData)}
 />
    </>
  )
}

export default MyPaper



