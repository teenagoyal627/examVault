import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const DownloadPaper = () => {
    const apiUrl = `${process.env.REACT_APP_APIURL}`
    const {id}=useParams()
    const[fileUrl,setFileUrl]=useState(null)

    useEffect(()=>{

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
                style={{ width: '100%', height: '80vh' }}></iframe>
            )
        }else{
            return <img src={fileUrl} alt="paper" style={{width:'50%',height:'20%'}}/>
        }
    }
  return (
    <div>
     <button>Download paper</button>
     {renderFile()}
    </div>
  )
}

export default DownloadPaper
