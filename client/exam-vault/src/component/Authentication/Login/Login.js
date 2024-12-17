import React, { useState } from 'react'
import { handleLoginChange, loginSubmitHandler,handleConfirm } from './LoginUtility'
import FrontPageNavbar from '../../Navbar/FrontPageNavbar'
import classes from './Login.module.css'
import MessageBox from '../../MessageBox'
import {  useNavigate } from 'react-router'
const Login = () => {

  const navigate=useNavigate()
    const[loginData,setLoginData]=useState({
        email:"",
        password:""
    })
    const[showModal,setShowModal]=useState(false)
    const[modalContent,setModalContent]=useState({
      title:'',
      body:''
    })

    const handleClose=()=>{
      setShowModal(false)
    }

  return (
    <div>
<FrontPageNavbar/>
<div className={classes.modal}>
    <h5 className={classes.heading}>Login Form</h5>
    <hr/>
    <form onSubmit={(e)=>loginSubmitHandler(e,loginData,setShowModal,setModalContent)} className={classes.loginForm}>
        <label>Email</label>
        <input type="email" id='email' value={loginData.email} onChange={(e)=>handleLoginChange(e,setLoginData)} required/>
        <label>Password</label>
        <input type="password" id='password' value={loginData.password} onChange={(e)=>handleLoginChange(e,setLoginData)} required/>
        <button className={classes.button}>Login</button>

    </form>
    </div>
    <MessageBox
  showModal={showModal}
  handleClose={handleClose}
  title={modalContent.title}
  body={modalContent.body}
  handleConfirm={()=>handleConfirm(setShowModal,navigate,modalContent)}
 />
    </div>

  )
}

export default Login
