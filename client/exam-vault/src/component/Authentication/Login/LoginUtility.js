import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../Firebase'
import axios from 'axios'

import { toast } from 'react-toastify';


export const loginSubmitHandler = async (
  e,
  loginData,
  setShowModal,
  setModalContent,
  navigate,
  setLoading
) => {
  try {
    console.log("login button is clicked.....")
    await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
    const idToken = await getAuth().currentUser.getIdToken(true);
    const apiUrl = `${process.env.REACT_APP_APIURL}`;
    const response = await axios.get(`${apiUrl}/login/get_role`, {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    const { role, status, name } = response.data;
    console.log("Role:", role, "Status:", status, "Name:", name);
    if (role === 'teacher') {
      if (status === 'Approved') {
        // setLoading(false)
        toast.success(`Hello ${name}! Welcome to Exam Vault. Glad to have you here!`);
        sessionStorage.setItem("authToken", idToken);
        // setTimeout(() => 
        //   // navigate('/all_paper'),
        // 3000);
      } else {
        // setLoading(false)
        setShowModal(true);
        setModalContent({ title: 'Approval Pending', body: 'Your approval is still pending. Please wait.' });
      }
    }

    else if (role === 'student') {
      // setLoading(false)
      toast.success(`${name} successfully logged in!`);
      sessionStorage.setItem("authToken", idToken);
      setTimeout(() => navigate('/upload_paper'), 3000);
    }

  } catch (error) {
    console.log(error)
    // setLoading(false)
    setShowModal(true);
    setModalContent({
      title: 'Login Error',
      body: error?.response?.data?.message || 'Invalid Login Credentials, Please Check their email or password.',
    });
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
