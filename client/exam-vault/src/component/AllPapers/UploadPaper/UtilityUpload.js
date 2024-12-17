import { getAuth } from "firebase/auth";
import classes from "./UploadPaper.module.css";
import axios from "axios";

export const newPaperChangeHandler = (e, setNewPaper) => {
  const { name, value } = e.target;
  setNewPaper((prevPaper) => ({
    ...prevPaper,
    [name]: value,
  }));
};

export const fileUploadConfirmHandler = (setShowModal) => {
  setShowModal(false);
  document.getElementById("fileInput").click();
};

export const modalOpenHandler = (setShowModal, setModalContent) => {
  setShowModal(true);
  setModalContent({
    title: "Choose File type",
    body: (
      <div>
        <p>Points to be remember....</p>
        <p>1. Only one JPEG file can be upload.</p>
        <p>2. PDF file size must be 50mb or below.</p>
        <select className={classes.fileTypeSelect}>
          <option value="jpeg">JPEG</option>
          <option value="pdf">PDF</option>
        </select>
      </div>
    ),
  });
};

export const fileChangeHandler = (e, setSelectedFile) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedFile(file.name);
  }
};

export const newPaperSubmitHandler = async(e,newPaper,setShowModal,setModalContent) => {
  try{
    e.preventDefault();
  const idToken=await getAuth().currentUser.getIdToken();
  const paperDetails={
    title:newPaper.title,
    department:newPaper.department,
    subject: newPaper.subject,
    year: newPaper.year,
    semester: newPaper.semester,
    paper_type: newPaper.paper_type,
    exam_type: newPaper.exam_type,
  }

  const apiUrl="http://localhost:5000/upload_paper"
   await axios.post(apiUrl,paperDetails,{
    headers:{
        Authorization:`Bearer ${idToken}`
    }
   }).then((res)=>{
    setShowModal(true)
    setModalContent({
        title:"Successful Message",
        body:"Paper is successfully uploaded...."
    })
   }) 
   
}
   catch(error){
    setShowModal(true)
    setModalContent({
        title:"error",
        body:`${error}`
    })

}
}