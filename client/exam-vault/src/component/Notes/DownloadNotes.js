import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import classes from '../Papers/AllPapers/MyPaper/DownloadPaper.module.css'
import { getAuth, onAuthStateChanged } from "firebase/auth";


const DownloadNotes = () => {
  const apiUrl = `${process.env.REACT_APP_APIURL}`;
  const { id } = useParams();
  const [fileUrl, setFileUrl] = useState(null);
  const[data,setData]=useState([])
  const[user,setUser]=useState(null)

  useEffect(
    () => {
      const fetchFileUrl = async () => {
        try {
          axios
            .get(`${apiUrl}/notes/${id}/view_notes`, {
              params: { id }
            })
            .then(response => {
              setFileUrl(response.data.file_url);
              setData(response.data)
            })
            .catch(error => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      };
      fetchFileUrl();
    },
    [id, apiUrl]
  );

  useEffect(()=>{
    const auth=getAuth();
    const unsubscribe=onAuthStateChanged(auth,(user)=>{
     if(user){
       setUser(user)
     }
    })
    return ()=>unsubscribe()

},[])


const downloadHandler = async() => {
  if (!fileUrl) {
    return;
  }
  const sub=data.subject 
  const semester=data.semester 

  const idToken=await user.getIdToken()
 axios.post(`${apiUrl}/notes/download_notes`,{
        paper_id:data._id
  },{
      headers:{
        Authorization:`Bearer ${idToken}`
      }
  })


  axios.get(fileUrl, { responseType: "blob" })
    .then((response) => {
      const contentType = response.headers["content-type"] || "application/octet-stream";
      const extension = contentType.includes("pdf") ? "pdf" : "jpeg"; 

      const blob = new Blob([response.data], { type: contentType });
      const link = document.createElement("a");

      link.href = window.URL.createObjectURL(blob);
      
      link.download = `${sub} ${semester}.${extension}`; 
      link.click();

      window.URL.revokeObjectURL(link.href);
    })
    .catch((error) => console.error("Error downloading the file:", error));
};




  const renderFile = () => {
    if (!fileUrl) {
      return <p>Loading file....</p>;
    }

    if (fileUrl.endsWith(".pdf")) {
      return (
        <iframe
          src={fileUrl}
          title="PDF Viewer"
          className={`${classes["paper-container"]} ${classes["paper-pdf"]}`}
        />
      );
    } else {
      return (
        <img
          src={fileUrl}
          alt="paper"
          className={`${classes["paper-container"]} ${classes["paper-image"]}`}
        />
      );
    }
  };


  
  return (
    <div className={classes.card}>
      <button className={classes.Button} onClick={()=>downloadHandler()}>Download Notes</button>
      {renderFile()}
    </div>
  );
};

export default DownloadNotes;
