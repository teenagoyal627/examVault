import React from 'react'
import MessageBox from '../../MessageBox'
import { useNavigate } from 'react-router'

const Logout = ({showModal,setShowModal}) => {
  console.log(showModal)
  console.log(setShowModal)
    const navigate=useNavigate()

    const handleLogout=()=>{
        setShowModal(false)
        localStorage.removeItem("authToken")
         navigate('/login_form')
    }

  return (
    <>
     <MessageBox
          showModal={showModal}
          handleClose={() => setShowModal(false)}
          title="Are you sure?"
          body="Do you really want to logout?"
          handleConfirm={handleLogout}
        />
    </>
  )
}

export default Logout
