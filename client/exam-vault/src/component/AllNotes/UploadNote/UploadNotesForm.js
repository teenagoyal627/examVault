import React, { useEffect, useState } from 'react'
import Card from '../../UI/Card'
import FieldsInput from '../../FormInputs/FieldsInput'
import subjects from '../../AllPapers/UploadPaper/Subject'
import classes from '../../AllPapers/UploadPaper/UploadPaper.module.css'
import MessageBox from '../../MessageBox'
import {
  fileChangeHandler,
  modalOpenHandler,
  newNotesChangeHandler,
  newNotesSubmitHandler
} from './UtilityUPloadNotes'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


const UploadNotesForm = () => {
  const [newNotes, setNewNotes] = useState({
    subject: '',
    department: '',
    year: '',
    semester: '',
    unit_no:''

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
      axios.get(`${apiUrl}/notes/get_notes/${id}`)
        .then((response) => {
          const fileUrl=response.data.file_url
          const fileName=fileUrl.split('/').pop()
          setNewNotes({
            subject: response.data.subject,
            department: response.data.department,
            year: response.data.year,
            semester: response.data.semester,
            unit_no:response.data.unit_no
          })
          setSelectedFile({name:fileName})
          setLoading(false)
        })
        .catch(error => {
          setShowModal(true)
          setModalContent({
            title: "Error",
            body: `Error while getting the notes, ${error}`
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
              ? 'Please wait, the notes is being updated...' 
              : 'Your notes is being submitted, this might take a moment...') 
          : 'Wait a minute, data is being loaded...'
        }          </div>
      </div>
    </div>
   )}
    <form
      onSubmit={e =>{
          setIsSubmitting(true)
        newNotesSubmitHandler(
          e,
          id,
          newNotes,
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
        <h5 className={classes.heading}>Upload Notes</h5>
        <hr />
        <label className={classes.label}>Upload Notes <span className={classes.required}>*</span></label>
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
            Select Notes File
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
          label='Department'
          type='select'
          name='department'
          value={newNotes.department}
          onChange={e => newNotesChangeHandler(e, setNewNotes)}
          required={true}
          options={['CSE', 'CIVIL', 'ME', 'EE', 'Other']}
        />
       
        <FieldsInput
          label='Year'
          type='select'
          name='year'
          value={newNotes.year}
          onChange={e => newNotesChangeHandler(e, setNewNotes)}
          required={true}
          options={['1st', '2nd', '3rd', '4th']}
        />
        <FieldsInput
          label='Semester'
          type='select'
          name='semester'
          value={newNotes.semester}
          onChange={e => newNotesChangeHandler(e, setNewNotes)}
          required={true}
          options={['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']}
        />
         <FieldsInput
          label='Subject'
          type='select'
          name='subject'
          value={newNotes.subject}
          onChange={e => newNotesChangeHandler(e, setNewNotes)}
          required={true}
          options={subjects}
          style={{ width: "1rem" }}
        />
        <FieldsInput
          label='Unit No.'
          type='select'
          name='unit_no'
          value={newNotes.unit_no}
          onChange={e => newNotesChangeHandler(e, setNewNotes)}
          required={true}
          options={['I', 'II', 'III', 'IV','V','VI','VII']}
        />
        <button className={classes.button}>Upload</button>
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

export default UploadNotesForm

