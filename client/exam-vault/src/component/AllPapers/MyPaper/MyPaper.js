import axios from 'axios'
import React, { useEffect, useState } from 'react'
import classes from './MyPaper.module.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { deleteHandler, deletePaperHandler, editPaperHandler, viewHandler } from './MyPaperUtility'
import MessageBox from '../../MessageBox'
import { Outlet, useLocation, useNavigate } from 'react-router'

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
      if (response.data.approved_by) {
        setApprovedBy(true)
      }
    } catch (error) {
      console.error('Error fetching papers:', error)
    }
  }

  const CreatedAtDate = inputDate => {
    const date = new Date(inputDate)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
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
          {console.log(paperData)}
          {paperData.map((data, index) => (
            <div key={index} className={classes.paperCard}>
              <div className={classes.imageContainer}>
                {data.file_url.endsWith('.pdf') ? (
                  <iframe
                    src={data.file_url}
                    title="PDF Preview"
                    // className={classes.paperImage}
                    // style={{ width: '100%', height: '200px', border: 'none' }}
                  ></iframe>
                ) : (
                  <img
                    src={data.file_url}
                    alt="Paper"
                    className={classes.paperImage}
                  />
                )}
              </div>
              <div className={classes.paperDetails}>
                <table className={classes.paperTable}>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Exam Type</strong>
                      </td>
                      <td>{data.exam_type}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Paper Type</strong>
                      </td>
                      <td>{data.paper_type}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Subject</strong>
                      </td>
                      <td>{data.subject}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Department</strong>
                      </td>
                      <td>{data.department}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Year/Semester</strong>
                      </td>
                      <td>
                        {data.year} Year {data.semester} Semester
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Uploaded At</strong>
                      </td>
                      <td>{CreatedAtDate(data.created_at)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Approval Status</strong>
                      </td>
                      <td
                        className={
                          data.paper_approval_status === 'Pending'
                            ? classes.statusPending
                            : data.paper_approval_status === 'Rejected'
                            ? classes.statusRejected
                            : data.paper_approval_status === 'Approved'
                            ? classes.statusApproved
                            : ''
                        }
                      >
                        {data.paper_approval_status}
                      </td>
                    </tr>
                    {!approvedBy && (
                      <tr>
                        <td>
                          <strong>Approved By</strong>
                        </td>
                        <td>{data.approved_by}</td>
                      </tr>
                    )}

                    {approvedBy && data.paper_approval_status === 'Approved' && (
                      <tr>
                        <td>
                          <strong>Approved At</strong>
                        </td>
                        <td>{CreatedAtDate(data.approval_at)}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div>
                  <button onClick={()=>viewHandler(data._id,navigate)} className={classes.Button}>View</button>
                  <button style={{background:"yellow"}} onClick={()=>editPaperHandler(data._id,navigate)} className={classes.Button}>
                    Edit
                  </button>
                  <button style={{background:"red"}}
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
