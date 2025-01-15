import axios from 'axios'
import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

import { Navbar } from 'responsive-navbar-react'
import 'responsive-navbar-react/dist/index.css'

const AllPaperNavBar = () => {
const[userRole,setUserRole]=useState('')
useEffect(()=>{
     fetchUserRole();
},[])

const fetchUserRole=async()=>{
  const auth=getAuth()
  console.log(auth)
  const idToken=await auth.currentUser.getIdToken();
  const apiUrl = 'http://localhost:5000/login'

  await axios.get(`${apiUrl}/get_role`,{
    headers:{
      Authorization:`Bearer ${idToken}`
    }
  }).then((response)=>{
    setUserRole(response.data.role)
    console.log(response.data.role)
  }).catch((error)=>{
    console.log(error)
  })
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

]

if(userRole==="teacher"){
  items.push({
    text:'New Papers',
    link:'/new_papers'
  })
}

  const props = {
    items,
    logo: {
      text: 'Exam Vault',
      link:'/'
    },

    style: {
      barStyles: {
        background: 'rgb(165, 195, 142)'
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