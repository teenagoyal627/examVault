import axios from 'axios'
import React, { useEffect, useState } from 'react'
import classes from './MyPaper.module.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { deleteHandler, deletePaperHandler, editPaperHandler } from './MyPaperUtility'
import MessageBox from '../../MessageBox'
import {  useNavigate } from 'react-router'

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


  const apiurl = 'http://localhost:5000/papers/my_paper'

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
      const response = await axios.get(apiurl, {
        params: { uid: uid }
      })
      setPaperData(response.data)
      console.log(response.data)
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

  return (
    <>
      {/* shoe loading indicator */}
      {!userId && <p>User is not login...</p>}
      {userId && (
        <div className={classes.paperContainer}>
          {paperData.map((data, index) => (
            <div key={index} className={classes.paperCard}>
              <div className={classes.imageContainer}>
                <img
                  src='https://website-assets.studocu.com/img/document_thumbnails/9ad5b0bdeb1654757d0d70e9d6bc07f8/thumb_300_424.png'
                  alt='paper'
                  className={classes.paperImage}
                />
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
                          data.approval_status === 'Pending'
                            ? classes.statusPending
                            : data.approval_status === 'Rejected'
                            ? classes.statusRejected
                            : data.approval_status === 'Approved'
                            ? classes.statusApproved
                            : ''
                        }
                      >
                        {data.approval_status}
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

                    {approvedBy && data.approval_status === 'Approved' && (
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
                  <button className={classes.Button}>View</button>
                  <button onClick={()=>editPaperHandler(data._id,navigate)} className={classes.Button}>
                    Edit
                  </button>
                  <button
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
