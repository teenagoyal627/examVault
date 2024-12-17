import React, { useState } from "react";
import Card from "../../UI/Card";
import FieldsInput from "../../Authentication/Registration/Forms/FieldsInput";
import subjects from "./Subject";
import classes from "./UploadPaper.module.css";
import MessageBox from "../../MessageBox";
import { fileChangeHandler, fileUploadConfirmHandler, modalOpenHandler, newPaperChangeHandler, newPaperSubmitHandler } from "./UtilityUpload";

const UploadPapers = () => {
  const [newPaper, setNewPaper] = useState({
    title: "",
    subject: "",
    department: "",
    year: "",
    semester: "",
    paper_type: "",
    exam_type: "",
  });

  const[showModal,setShowModal]=useState(false)
  const[selectedFile,setSelectedFile]=useState(null)
  const[modalContent,setModalContent]=useState({
    title:'',
    body:''
  })

  return (
    <form onSubmit={(e)=>newPaperSubmitHandler(e,newPaper,setShowModal,setModalContent)}>
    <Card>
      <h5 className={classes.heading}>New Paper</h5>
      <hr />
      <label className={classes.label}>Upload Paper</label><br/>
      <div className={classes.fileInputWrapper}>
          <button className={classes.customFileButton} onClick={()=>modalOpenHandler(setShowModal,setModalContent)}>
            Select Paper File
          </button>
          {selectedFile && <p className={classes.fileName}>{selectedFile}</p>}
          <input
            id="fileInput"
            type="file"
            className={classes.hiddenFileInput}
            onChange={(e)=>fileChangeHandler(e,setSelectedFile)}
          />
        </div>
      <FieldsInput
        label="Title"
        type="text"
        name="title"
        value={newPaper.title}
        onChange={(e)=>newPaperChangeHandler(e,setNewPaper)}
      />
      <FieldsInput
        label="Subject"
        type="select"
        name="subject"
        value={newPaper.subject}
        onChange={(e)=>newPaperChangeHandler(e,setNewPaper)}
        options={subjects}
      />
      <FieldsInput
        label="Department"
        type="select"
        name="department"
        value={newPaper.department}
        onChange={(e)=>newPaperChangeHandler(e,setNewPaper)}
        options={["CSE", "Civil", "ME", "EE", "Other"]}
      />
      <FieldsInput
        label="Year"
        type="select"
        name="year"
        value={newPaper.year}
        onChange={(e)=>newPaperChangeHandler(e,setNewPaper)}
        options={["1st", "2nd", "3rd", "4th"]}
      />
      <FieldsInput
        label="Semester"
        type="select"
        name="semester"
        value={newPaper.semester}
        onChange={(e)=>newPaperChangeHandler(e,setNewPaper)}
        options={["I", "II", "III", "IV", "V", "VI", "VII", "VIII"]}
      />
      <FieldsInput
        label="Paper Type"
        type="select"
        name="paper_type"
        value={newPaper.paper_type}
        onChange={(e)=>newPaperChangeHandler(e,setNewPaper)}
        options={["Main", "Back", "Other"]}
      />
      <FieldsInput
        label="Exam Type"
        type="select"
        name="exam_type"
        value={newPaper.exam_type}
        onChange={(e)=>newPaperChangeHandler(e,setNewPaper)}
        options={["University", "Midterm", "Improvement", "Other"]}
      />
      <button className={classes.button}>Submit</button>
    </Card>
    { showModal && 
    <MessageBox
  showModal={showModal}
  handleClose={()=>setShowModal(false)}
  title={modalContent.title}
  body={modalContent.body}
  handleConfirm={()=>fileUploadConfirmHandler(setShowModal)}

 />}
    </form>
  );
};

export default UploadPapers;
