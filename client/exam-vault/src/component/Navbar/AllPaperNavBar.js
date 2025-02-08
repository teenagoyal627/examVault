import axios from 'axios'
import {  getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

import { Navbar } from 'responsive-navbar-react'
import 'responsive-navbar-react/dist/index.css'
import Logout from '../Authentication/Logout/Logout'
import MessageBox from '../MessageBox'
import { useNavigate } from 'react-router'

const AllPaperNavBar = () => {
const[userRole,setUserRole]=useState('')
  const[showModal,setShowModal]=useState(false)
  const navigate=useNavigate()

  useEffect(() => {
    console.log("Modal state changed:", showModal);
  }, [showModal])
  
useEffect(()=>{
  const auth=getAuth()
 
  const unsubscribe=onAuthStateChanged(auth,(user)=>{
    if(user){
      fetchUserRole(user)
    }else{
      setUserRole('')
    }
  })
  return ()=>unsubscribe()

},[])

const fetchUserRole=async(user)=>{
  try{
    const idToken=await user.getIdToken();
    const apiUrl = 'http://localhost:5000/login'
  
    const response=await axios.get(`${apiUrl}/get_role`,{
      headers:{
        Authorization:`Bearer ${idToken}`
      }
    })
      setUserRole(response.data.role)
  }catch(error){
    console.log("Failed to fetch user role  ",error)
  }
}

const items= [
  {
    text: 'Home',
    link: '/all_paper'
  },
  {
    text: 'Upload Papers',
    link: '/upload_paper'
  },
  {
    text: 'My Papers',
    link: '/my_paper'
  },
  {
    text: 'Stats',
    link: '/stats'
  },

  ...(userRole==='teacher' ? 
    [{ text:'New Papers',
      link:'/new_papers'
    }] :[]
  ),
  {
    text: "Logout",
    link: "#",
    onClick: (e) => {
      e.preventDefault(); 
      setShowModal((prev)=>!prev);
      console.log(showModal) 
    }
  }
]
  const props = {
    items,
    logo: {
      text: 'Exam Vault',
      link:'/'
    },

    style: {
      barStyles: {
        background: 'rgb(66, 67, 64)'
      },
      sidebarStyles: {
        background: '#222',
        buttonColor: 'white'
      }
    }
  }
  const handleLogout=()=>{
    setShowModal(false)
    sessionStorage.removeItem("authToken")
     navigate('/login_form')
}

  return(
    <>
  <Navbar {...props} />
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

export default AllPaperNavBar