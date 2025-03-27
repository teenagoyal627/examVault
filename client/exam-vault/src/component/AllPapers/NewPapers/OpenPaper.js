import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { approvedOrRejectPaper, approvePaperHandler, rejectPaperHandler } from './NewPaperUtility';
import { editPaperHandler } from '../MyPaper/MyPaperUtility';
import MessageBox from '../../MessageBox';
import { getAuth } from 'firebase/auth';
import classes from './OpenPaper.module.css'
import PaperTabular from '../PaperTabular';

const OpenPaper = () => {
    const apiUrl = `${process.env.REACT_APP_APIURL}`
    const {id}=useParams()
    const[fileUrl,setFileUrl]=useState(null)
    const[data,setData]=useState([])
    const[paperData,setPaperData]=useState([])
    const[showModal,setShowModal]=useState(false)
    const[modalContent,setModalContent]=useState({
        title:"",
        body:""
    })
    const[comment,setComment]=useState("")
    const navigate=useNavigate()

    useEffect(()=>{
        const fetchTeacherData=async()=>{
            try{
                const idToken = await getAuth().currentUser.getIdToken()
                const apiUrl=`${process.env.REACT_APP_APIURL}`
                axios.get(`${apiUrl}/login/get_teacher_data`,{
                    headers: {
                        Authorization: `Bearer ${idToken}`
                      }
                })
                .then((response)=>{
                      setData(response.data)
                }).catch((error)=>{
                    console.log(error)
                })
            }catch(error){
                console.log(error)
            }
             try {
                  const response = await axios.get(`${apiUrl}/papers/new_papers`);
                  setPaperData(response.data || []);
                } catch (error) {
                  console.error("Error fetching papers:", error);
                }
        }

        const fetchFileUrl=async()=>{
            try{
                axios.get(`${apiUrl}/papers/${id}/view_paper`,{
                    params:{id}
                 }).then((response)=>{
                    setFileUrl(response.data.file_url)
                 }).catch((error)=>{
                    console.log(error)
                 })
            }catch(error){
                console.log(error)
            }
        }
        fetchFileUrl();
        fetchTeacherData();
       
    },[id,apiUrl])

    const renderFile=()=>{
        if(!fileUrl){
            return <p>Loading file....</p>
        }
        if(fileUrl.endsWith('.pdf')){
            return (
                <iframe
                src={fileUrl}
                title="PDF Viewer"
                className={`${classes["paper-container"]} ${classes["paper-pdf"]}`}
                ></iframe>
            )
        }else{
            return (
                <img
                    src={fileUrl}
                    alt="paper"
                    className={`${classes["paper-container"]} ${classes["paper-image"]}`}
                />
            )
        }
    }


  return (
<>
     <div className={classes.card}>
    <div className={classes.buttons}>
     <button onClick={()=>approvePaperHandler(setShowModal,setModalContent)} className={classes.Button}>Approve</button>
     <button onClick={()=>rejectPaperHandler(setShowModal,setModalContent,setComment,comment)} className={classes.Button} style={{background:"rgb(220, 53, 69)"}}>Reject</button>
     <button onClick={()=>editPaperHandler(id,navigate)} className={classes.Button} style={{background:"rgb(255, 165, 0)"}}>Edit</button>
       </div>
       {console.log(paperData.title)}
       <PaperTabular  data={paperData} approvedBy={false}  />
     {renderFile()}
    </div>

    <MessageBox
    showModal={showModal}
    handleClose={()=>setShowModal(false)}
    title={modalContent.title}
    body={modalContent.body}
    handleConfirm={()=>approvedOrRejectPaper(id,modalContent,navigate,data,comment)}
   />

</>
  )
}

export default OpenPaper
