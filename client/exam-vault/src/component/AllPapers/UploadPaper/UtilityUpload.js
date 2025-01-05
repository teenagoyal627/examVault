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

export const fileUploadConfirmHandler = (setShowModal) => {
  setShowModal(false)
  document.getElementById('fileInput').click()
}

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
    )
  })
}

export const fileChangeHandler = (
  e,
  setSelectedFile,
  selectedFileType,
  setShowModal,
  setModalContent
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
      body: `You selected ${selectedFileType.toUpperCase()} but uploaded a ${fileType.toUpperCase()} file. Please select the correct file type.`
    })
    return
  }

  if (selectedFileType === 'pdf' && fileSizeMB > 50) {
    setShowModal(true)
    setModalContent({
      title: 'File too Large',
      body: 'PDF file size must be 50 MB or below.'
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
        body: 'No file selected. Please upload a file before submission.'
      })
      return
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("department", newPaper.department);
    formData.append("subject", newPaper.subject);
    formData.append("year", newPaper.year);
    formData.append("semester", newPaper.semester);
    formData.append("paper_type", newPaper.paper_type);
    formData.append("exam_type", newPaper.exam_type);

    // const uploadPresent=`${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`
    // // const folder=`${process.env.REACT_APP_CLOUDINARY_UPLOAD_FOLDER}`
    //   const folderName=
    // const fileType = selectedFile.type;
    // const isPDF = fileType === 'application/pdf';
    // const cloudinaryEndpoint = isPDF
    //   ? `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/raw/upload`
    //   : `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;



    // const imagePDFData = new FormData()
    // imagePDFData.append('file', selectedFile)
    // imagePDFData.append('upload_preset', uploadPresent)
    // imagePDFData.append('folder', folder)

    // const cloudinaryResponse = await axios.post(
    //   cloudinaryEndpoint,
    //   imagePDFData
    // )
    // const cloudinaryUrl = cloudinaryResponse.data.secure_url
    // console.log(cloudinaryUrl)
    const idToken = await getAuth().currentUser.getIdToken()

    // const paperDetails = {
    //   title: newPaper.title,
    //   department: newPaper.department,
    //   subject: newPaper.subject,
    //   year: newPaper.year,
    //   semester: newPaper.semester,
    //   paper_type: newPaper.paper_type,
    //   exam_type: newPaper.exam_type,
    //   file_url: cloudinaryUrl
    // }

    const axiosMethod = id ? axios.put : axios.post
    const apiUrl = 'http://localhost:5000/papers'
    const axiosUrl = id
      ? `${apiUrl}/edit_paper/${id}`
      : `${apiUrl}/upload_paper`
    console.log(axiosUrl)
    await axiosMethod(axiosUrl, formData, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type":"multipart/form-data"
      }
    })
    console.log('Paper is successfully submitted on mongodb..')
    setShowModal(true)
    setModalContent({
      title:'Confirmation',
      body: 'Paper is successfully uploaded.'
    })
    navigate('/my_paper')
  } catch (error) {
    setShowModal(true)
    setModalContent({
      title: 'Error',
      body: `Error while uploding the paper  ${error}`
    })
  }
}
