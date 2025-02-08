import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../Firebase'
import axios from 'axios'

import { toast } from 'react-toastify';


export const loginSubmitHandler = async (
  e,
  loginData,
  setShowModal,
  setModalContent,
  navigate
) => {
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
        const { role, status, name } = response.data
        if (role === 'teacher') {
          if (status === 'Approved') {
            toast.success(`${name} successfully logged in!`)
            sessionStorage.setItem("authToken",idToken)
            setTimeout(() => {
              navigate('/all_paper');
            }, 3000);
          } else {
            setShowModal(true)
            setModalContent({
              title: 'Approval Pending',
              body: 'Your approval is still pending. Please wait.'
            })
          }
        }
        else if (role === 'student') {
          toast.success(`${name} successfully logged in!`)
          sessionStorage.setItem("authToken",idToken)
          setTimeout(() => {
            navigate('/upload_paper');
          }, 3000);

        }
      })
      .catch(error => {
        setShowModal(true)
        setModalContent({
          title: 'Login Error',
          body: `Error comes getting response.`
        })
      })
  } catch (error) {
    setShowModal(true)
    setModalContent({
      title: 'Login Error',
      body: `Invalid Login Credentials.`
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
  if (modalContent.title === 'Approval Pending') {
    setShowModal(false)
    navigate('/')
  } else {
    setShowModal(false)
    navigate('/login_form')
  }
}
