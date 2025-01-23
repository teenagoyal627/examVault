import axios from 'axios'
import { browserLocalPersistence, getAuth, onAuthStateChanged, setPersistence } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

import { Navbar } from 'responsive-navbar-react'
import 'responsive-navbar-react/dist/index.css'

const AllPaperNavBar = () => {
const[userRole,setUserRole]=useState('')
useEffect(()=>{
  const auth=getAuth()
 
  const unsubscribe=onAuthStateChanged(auth,(user)=>{
    if(user){
      console.log(user)
      fetchUserRole(user)
    }else{
      console.log("User is signed out....")
      setUserRole('')
    }
  })
  return ()=>unsubscribe()

},[])

const fetchUserRole=async(user)=>{
  console.log(user)
  
  try{
    const idToken=await user.getIdToken();
    console.log(idToken)
    const apiUrl = 'http://localhost:5000/login'
  
    const response=await axios.get(`${apiUrl}/get_role`,{
      headers:{
        Authorization:`Bearer ${idToken}`
      }
    })
      setUserRole(response.data.role)
      console.log(response.data.role)

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
  )

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
  return <Navbar {...props} />
}

export default AllPaperNavBar