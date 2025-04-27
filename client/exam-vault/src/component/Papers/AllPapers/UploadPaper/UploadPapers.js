import React, { useEffect, useState } from 'react'
import Card from '../../../UI/Card'
import FieldsInput from '../../../FormInputs/FieldsInput'
import subjects from './Subject'
import classes from './UploadPaper.module.css'
import MessageBox from '../../../MessageBox'
import {
  fileChangeHandler,
  modalOpenHandler,
  newPaperChangeHandler,
  newPaperSubmitHandler
} from './UtilityUpload'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


const UploadPapers = () => {
  const [newPaper, setNewPaper] = useState({
    title: '',
    subject: '',
    department: '',
    year: '',
    semester: '',
    paper_type: '',
    exam_type: ''
  })

  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedFileType, setSelectedFileType] = useState('jpeg')
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({
    title: '',
    body: '',
    confirmHandler: null
  })
  const[loading,setLoading]=useState(false)
  const[isSubmitting,setIsSubmitting]=useState(false)
  const { id } = useParams()
  const apiUrl = `${process.env.REACT_APP_APIURL}`

   

  useEffect(() => {
   const token= sessionStorage.getItem("authToken")
   if(!token){
    navigate('/login_form')
   }
    if (id) {
      setLoading(true)
      axios.get(`${apiUrl}/papers/get_paper/${id}`)
        .then((response) => {
          const fileUrl=response.data.file_url
          const fileName=fileUrl.split('/').pop()
          setNewPaper({
            title:response.data.title ,
            subject: response.data.subject,
            department: response.data.department,
            year: response.data.year,
            semester: response.data.semester,
            paper_type: response.data.paper_type,
            exam_type: response.data.exam_type
          })
          setSelectedFile({name:fileName})
          setLoading(false)
        })
        .catch(error => {
          setShowModal(true)
          setModalContent({
            title: "Error",
            body: `Error while getting the paper, ${error}`
          })
          setLoading(false)
        })
    }
  }, [id, apiUrl, navigate])

  return (
    <>
    {loading &&(
    <div className="loading-backdrop">
      <div className="loading-box">
        <div className="loading-spinner"></div>
        
        <div className="loading-text"> 
        {isSubmitting 
          ? (id 
              ? 'Please wait, the paper is being updated...' 
              : 'Your paper is being submitted, this might take a moment...') 
          : 'Wait a minute, data is being loaded...'
        }          </div>
      </div>
    </div>
   )}
    <form
      onSubmit={e =>{
          setIsSubmitting(true)
        newPaperSubmitHandler(
          e,
          id,
          newPaper,
          setShowModal,
          setModalContent,
          navigate,
          selectedFile,
          setLoading,
          loading
        )
      }
      }
    >
      <Card>
        <h5 className={classes.heading}>Upload Paper</h5>
        <hr />
        <label className={classes.label}>Upload Paper <span className={classes.required}>*</span></label>
        <br />
        <div className={classes.fileInputWrapper}>
          <button
            type='button'
            className={classes.customFileButton}
            onClick={() =>
              modalOpenHandler(
                setShowModal,
                setModalContent,
                setSelectedFileType
              )
            }
          >
            Select Paper File
          </button>
          {selectedFile
           && (
            <p className={classes.fileName}>{selectedFile.name}</p>
          )}
          <input
            id='fileInput'
            type='file'
            className={classes.hiddenFileInput}
            onChange={e =>
              fileChangeHandler(
                e,
                setSelectedFile,
                selectedFileType,
                setShowModal,
                setModalContent,
                navigate
              )
            }
          />
        </div>
        <FieldsInput
          label='Title'
          type='text'
          name='title'
          value={newPaper.title}
          onChange={e => newPaperChangeHandler(e, setNewPaper)}
          required={true}
        />
        <FieldsInput
          label='Subject'
          type='select'
          name='subject'
          value={newPaper.subject}
          onChange={e => newPaperChangeHandler(e, setNewPaper)}
          required={true}
          options={subjects}
          style={{ width: "1rem" }}
        />
        <FieldsInput
          label='Department'
          type='select'
          name='department'
          value={newPaper.department}
          onChange={e => newPaperChangeHandler(e, setNewPaper)}
          required={true}
          options={['CSE', 'CIVIL', 'ME', 'EE', 'Other']}
        />
        <FieldsInput
          label='Year'
          type='select'
          name='year'
          value={newPaper.year}
          onChange={e => newPaperChangeHandler(e, setNewPaper)}
          required={true}
          options={['1st', '2nd', '3rd', '4th']}
        />
        <FieldsInput
          label='Semester'
          type='select'
          name='semester'
          value={newPaper.semester}
          onChange={e => newPaperChangeHandler(e, setNewPaper)}
          required={true}
          options={['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']}
        />
        <FieldsInput
          label='Paper Type'
          type='select'
          name='paper_type'
          value={newPaper.paper_type}
          onChange={e => newPaperChangeHandler(e, setNewPaper)}
          required={true}
          options={['Main', 'Back', 'Other']}
        />
        <FieldsInput
          label='Exam Type'
          type='select'
          name='exam_type'
          value={newPaper.exam_type}
          onChange={e => newPaperChangeHandler(e, setNewPaper)}
          required={true}
          options={['University', 'Midterm', 'Improvement', 'Other']}
        />
        <button className={classes.button}>Submit</button>
      </Card>
      {showModal && (
        <MessageBox
          showModal={showModal}
          handleClose={() => setShowModal(false)}
          title={modalContent.title}
          body={modalContent.body}
          handleConfirm={() =>
            modalContent.confirmHandler(
              setShowModal,
            )
          }
        />
      )}
    </form>
    </>
  )
}

export default UploadPapers
