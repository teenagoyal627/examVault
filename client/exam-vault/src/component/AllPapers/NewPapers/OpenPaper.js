import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import classes from '../MyPaper/MyPaper.module.css';
import { approvedOrRejectPaper, approvedPaperHandler, rejectPaperHandler } from './NewPaperUtility';
import { editPaperHandler } from '../MyPaper/MyPaperUtility';
import MessageBox from '../../MessageBox';
import { getAuth } from 'firebase/auth';

const OpenPaper = () => {
    const apiUrl = `${process.env.REACT_APP_APIURL}`
    const {id}=useParams()
    const[fileUrl,setFileUrl]=useState(null)
    const[data,setData]=useState([])
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
                axios.get('http://localhost:5000/login/get_teacher_data',{
                    headers: {
                        Authorization: `Bearer ${idToken}`
                      }
                })

                .then((response)=>{
                      setData(response.data)
                      console.log(response.data)
                }).catch((error)=>{
                    console.log(error)
                })
            }catch(error){
                console.log(error)
            }
        }
        const fetchFileUrl=async()=>{
            try{
                axios.get(`${apiUrl}/${id}/view_paper`,{
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
                style={{ width: '50%', height: '40vh' }}></iframe>
            )
        }else{
            return <img src={fileUrl} alt="paper" style={{marginTop:"3rem",width:"70%"}} />
        }
    }
  return (
    <>
     <div >
     <button onClick={()=>approvedPaperHandler(setShowModal,setModalContent)} className={classes.Button}>Approve</button>
     <button onClick={()=>rejectPaperHandler(setShowModal,setModalContent,setComment,comment)} className={classes.Button} style={{background:"red"}}>Reject</button>
     <button onClick={()=>editPaperHandler(id,navigate)} className={classes.Button} style={{background:"rgb(255, 165, 0)"}}>Edit</button>
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
