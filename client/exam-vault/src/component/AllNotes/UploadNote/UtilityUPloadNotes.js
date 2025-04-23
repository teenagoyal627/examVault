import { getAuth } from 'firebase/auth'
import classes from '../../AllPapers/UploadPaper/UploadPaper.module.css'
import axios from 'axios'

export const newNotesChangeHandler = (e, setNewPaper) => {
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
    title: 'Select File type',
    body: (
      <div>
        <p>Please note the following guidelines before uploading a file:</p>
        <p>1. You can upload only JPEG, PNG, or PDF files.</p>
        <p>2. The PDF file size must not exceed 50MB.</p>
        <select
          className={classes.fileTypeSelect}
          onChange={e => setSelectedFileType(e.target.value)}
        >
          <option value='jpeg'>JPEG</option>
          <option value='png'>PNG</option>
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
  console.log(setSelectedFile)
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
        setSelectedFile(null)
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
        setSelectedFile(null)
      }
    })
    return
  }
  setSelectedFile(file)
}


export const newNotesSubmitHandler = async (
  e,
  id,
  newNotes,
  setShowModal,
  setModalContent,
  navigate,
  selectedFile,
  setLoading,
  loading,

) => {
  try {
    e.preventDefault()
    if(!newNotes.department || !newNotes.subject || !newNotes.year || !newNotes.semester || !newNotes.unit_no ){
      setShowModal(true)
      setModalContent({
        title:"Missing Required Fields",
        body:"Please complete all required fields before submitting the form.",
        confirmHandler:()=>{
          setShowModal(false)
        }
      })
      return;
    }

    if (!selectedFile) {
      setShowModal(true)
      setModalContent({
        title: 'Error',
        body: 'No file selected. Please upload a file before submission.',
        confirmHandler:()=>{
          setShowModal(false)
          navigate('/upload_notes')
        }
      })
      return
    }

    const idToken = await getAuth().currentUser.getIdToken()
    const roleApiUrl = `${process.env.REACT_APP_APIURL}`
      
        const getRoleResponse=await axios.get(`${roleApiUrl}/login/get_role`,{
          headers:{
            Authorization:`Bearer ${idToken}`
          }
        })
        const role=getRoleResponse.data.role;
        const teacherName=getRoleResponse.data.name;
        console.log("edit paper user role",role)
               console.log(selectedFile)
     const formData = new FormData();

    formData.append("file", selectedFile);
    formData.append("department", newNotes.department);
    formData.append("subject", newNotes.subject);
    formData.append("year", newNotes.year);
    formData.append("semester", newNotes.semester);
    formData.append("unit_no", newNotes.unit_no);
    formData.append("role",role);
    formData.append("approved_by",teacherName);

    setLoading(true)

   console.log(formData)

      
    const axiosMethod = id ? axios.put : axios.post
    const apiUrl = `${process.env.REACT_APP_APIURL}`
    const axiosUrl = id
      ? `${apiUrl}/notes/edit_notes/${id}`
      : 'http://localhost:5001'
      // : `${apiUrl}/notes/upload_notes`
      
      console.log(axiosUrl)
    const response=  await axiosMethod(axiosUrl, formData, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type":"multipart/form-data"
      }
    });

    setLoading(false)

    if(response.data.error){
      setShowModal(true)
      setModalContent({
        title:'Upload Notes Error',
        body: `You are not approved user. ${response.data.error}`,
        confirmHandler:()=>{
          setShowModal(false)
          navigate('/teacher_form')
        }
      })
    }else{
      if(id){
             setShowModal(true)
             setModalContent({
              title:"Edit Successful",
              body:"The notes was updated successfully. You can now view it in All Papers.",
              confirmHandler:()=>{
                setShowModal(false)
                navigate('/all_paper')
              }

             })
      }else{
        setShowModal(true)
        setModalContent({
          title:'Upload Successful',
          body: 'The notes was uploaded successfully. You can now view it in My Papers',
          confirmHandler:()=>{
            setShowModal(false)
            navigate('/my_paper')
          }
        })
      }
    }
    
  } catch (error) {
    console.log(error)
    setLoading(false)
    setShowModal(true)
    setModalContent({
      title: 'Error',
      body:`Something went wrong. Please try again later. ${error}`,
      confirmHandler:()=>{
        setShowModal(false)
      }
    })
  }
}
