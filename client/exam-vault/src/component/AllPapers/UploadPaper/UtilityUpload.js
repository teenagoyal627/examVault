import { getAuth } from 'firebase/auth'
import classes from './UploadPaper.module.css'
import axios from 'axios'

export const newPaperChangeHandler = (e, setNewPaper) => {
  const { name, value } = e.target
  setNewPaper(prevPaper => ({
    ...prevPaper,
    [name]: value
  }))
}

// export const fileUploadConfirmHandler = (setShowModal) => {
//   setShowModal(false)
//   document.getElementById('fileInput').click()
// }

export const modalOpenHandler = (
  setShowModal,
  setModalContent,
  setSelectedFileType
) => {
  setShowModal(true)
  setModalContent({
    title: 'Choose File type',
    body: (
      <div>
        <p>Points to be remember....</p>
        <p>1. Only one JPEG file can be upload.</p>
        <p>2. PDF file size must be 50mb or below.</p>
        <select
          className={classes.fileTypeSelect}
          onChange={e => setSelectedFileType(e.target.value)}
        >
          <option value='jpeg'>JPEG</option>
          <option value='pdf'>PDF</option>
        </select>
      </div>
    ),
    confirmHandler:()=>{
      setShowModal(false)
      document.getElementById('fileInput').click()

    }
  })
}

export const fileChangeHandler = (
  e,
  setSelectedFile,
  selectedFileType,
  setShowModal,
  setModalContent,
  navigate
) => {
  const file = e.target.files[0]
  setSelectedFile(file)
  if (!file) {
    return
  }
  const fileType = file.type.split('/')[1]
  const fileSizeMB = file.size / (1024 * 1024)

  if (fileType !== selectedFileType) {
    setShowModal(true)
    setModalContent({
      title: 'Invalid File Type',
      body: `You selected ${selectedFileType.toUpperCase()} but uploaded a ${fileType.toUpperCase()} file. Please select the correct file type.`,
       confirmHandler:()=>{
        setShowModal(false)
        navigate('/upload_paper')
      }
    })
    return
  }

  if (selectedFileType === 'pdf' && fileSizeMB > 50) {
    setShowModal(true)
    setModalContent({
      title: 'File too Large',
      body: 'PDF file size must be 50 MB or below.',
      confirmHandler:()=>{
        setShowModal(false)
        navigate('/upload_paper')
      }
    })
    return
  }
  setSelectedFile(file)
}

export const newPaperSubmitHandler = async (
  e,
  id,
  newPaper,
  setShowModal,
  setModalContent,
  navigate,
  selectedFile
) => {
  try {
    e.preventDefault()

    if (!selectedFile) {
      setShowModal(true)
      setModalContent({
        title: 'Error',
        body: 'No file selected. Please upload a file before submission.',
        confirmHandler:()=>{
          setShowModal(false)
          navigate('/upload_paper')
        }
      })
      return
    }

    
    const idToken = await getAuth().currentUser.getIdToken()
    const axiosMethod = id ? axios.put : axios.post
    const apiUrl = 'http://localhost:5000/papers'
    const axiosUrl = id
      ? `${apiUrl}/edit_paper/${id}`
      : `${apiUrl}/upload_paper`


    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("department", newPaper.department);
    formData.append("subject", newPaper.subject);
    formData.append("year", newPaper.year);
    formData.append("semester", newPaper.semester);
    formData.append("paper_type", newPaper.paper_type);
    formData.append("exam_type", newPaper.exam_type);


    const response=  await axiosMethod(axiosUrl, formData, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type":"multipart/form-data"
      }
    });

    if(response.data.error){
      setShowModal(true)
      setModalContent({
        title:'Upload Paper Error',
        body: `You are not approved user. ${response.data.error}`,
        confirmHandler:()=>{
          setShowModal(false)
          navigate('/teacher_form')
        }
      })
    }else{
      console.log('Paper is successfully submitted on mongodb..')
      setShowModal(true)
      setModalContent({
        title:'Confirmation',
        body: 'Paper is successfully uploaded.',
        confirmHandler:()=>{
          setShowModal(false)
          navigate('/my_paper')
        }
      })
    }
    
    // .then((response)=>{
    //   console.log(response.data)

    //   console.log('Paper is successfully submitted on mongodb..')
    //   setShowModal(true)
    //   setModalContent({
    //     title:'Confirmation',
    //     body: 'Paper is successfully uploaded.',
    //     confirmHandler:()=>{
    //       setShowModal(false)
    //       navigate('/my_paper')
    //     }
    //   })
    //   // navigate('/my_paper')
    // }).catch((error)=>{
    //   setShowModal(true)
    //   setModalContent({
    //     title:'Upload Paper Error',
    //     body: `You are not approved user. ${error}`,
    //     confirmHandler:()=>{
    //       setShowModal(false)
    //       navigate('/teacher_form')
    //     }
    //   })
    // })
   
  } catch (error) {
    setShowModal(true)
    setModalContent({
      title: 'Error',
      body: `Error while uploding the paper  ${error}`,
      confirmHandler:()=>{
        setShowModal(false)
        navigate('/teacher_form')
      }
    })
  }
}
