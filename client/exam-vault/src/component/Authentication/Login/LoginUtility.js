import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../Firebase'
import axios from 'axios'

export const loginSubmitHandler = async (
  e,
  loginData,
  setShowModal,
  setModalContent
) => {
  console.log('login button is clicked')
  e.preventDefault()
  try {
    await signInWithEmailAndPassword(auth, loginData.email, loginData.password)

    const idToken = await getAuth().currentUser.getIdToken()
    const apiUrl = 'http://localhost:5000/login/get_role'
    await axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      })
      .then(response => {
        const { role, status } = response.data
        if (role === 'teacher') {
          if (status === 'Approved') {
            setShowModal(true)
            setModalContent({
              title: 'Login Successfully',
              body: `You are logged in as a ${role}`
            })
          } else {
            setShowModal(true)
            setModalContent({
              title: 'Approval Pending',
              body: 'Your approval is still pending. Please wait.'
            })
          }
        } else if (role === 'student') {
          setShowModal(true)
          setModalContent({
            title: 'Login Successfully',
            body: `You are logged in as a ${role}`
          })
        }
      })
      .catch(error => {
        setShowModal(true)
        setModalContent({
          title: 'Login Error',
          body: `Error comes getting response  ${error}`
        })
      })
  } catch (error) {
    setShowModal(true)
    setModalContent({
      title: 'Login Error',
      body: `Invalid Login Credentials.${error}`
    })
  }
}

export const handleLoginChange = (e, setLoginData) => {
  const { id, value } = e.target
  setLoginData(prevState => ({
    ...prevState,
    [id]: value
  }))
}

export const handleConfirm = (setShowModal, navigate, modalContent) => {
  if (modalContent.title === 'Login Successfully') {
    setShowModal(false)
    navigate('/upload_paper')
  } else if (modalContent.title === 'Approval Pending') {
    setShowModal(false)
    navigate('/')
  } else {
    setShowModal(false)
    navigate('/login_form')
  }
}
