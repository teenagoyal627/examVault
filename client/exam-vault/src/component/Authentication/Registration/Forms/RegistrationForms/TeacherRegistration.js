import React, { useState } from 'react'
import FrontPageNavbar from '../../../../Navbar/FrontPageNavbar'
import Card from '../../../../UI/Card'
import classes from '../Fields.module.css'
import FieldsInput from '../FieldsInput'
import { teacherRegSubmitHandler } from './Utility'
import { useNavigate } from "react-router"
import MessageBox from '../../../../MessageBox'

const TeacherRegistration = () => {

  const navigate=useNavigate()
  const [teacherData,setTeacherData]=useState({
    name:"",
    email:"",
    password:"",
    confirmPass:"",
    teacherId:"",
    department:"",
    university:"",
    college:""
  })

  const[showModal,setShowModal]=useState(false)
  const[modalContent,setModalContent]=useState({
    title:'',
    body:''
  })


  const handleTeacherChange=(event)=>{
    const{name,value}=event.target
    setTeacherData((prevData)=>({
       ...prevData,
      [name]:value,}
    ))
  }

  const handleClose=()=>{
    setShowModal(false)
  }
  
  const handleConfirm=()=>{
    navigate('..')
  }

  return (
<div>
    <FrontPageNavbar/>
 <Card>
      <h5 className={classes.heading}>Teacher Registration Form</h5>
      <h5 style={{fontSize:".9rem"}}>Note: Account approval might take some time. Please contact administrator</h5>
      <hr/>
    <form onSubmit={(e)=>teacherRegSubmitHandler(e,teacherData,navigate,setShowModal,setModalContent)}>
      <FieldsInput label='Name' type='text' name='name' value={teacherData.name} onChange={handleTeacherChange}/>
      <FieldsInput label='Email' type='email' name='email' value={teacherData.email} onChange={handleTeacherChange}/>
      <FieldsInput label='Password' type='password' name='password' value={teacherData.password} onChange={handleTeacherChange}/>
      <FieldsInput label='Confirm Password' type='password' name='confirmPass' value={teacherData.confirmPass} onChange={handleTeacherChange}/>
      <FieldsInput label='Teacher ID' type='text' name='teacherId' value={teacherData.teacherId} onChange={handleTeacherChange}/>
      <FieldsInput label='Department' type='select' name='department' value={teacherData.department} options={['CSE','ME','Civil','EE','Other']} onChange={handleTeacherChange}/>
      <FieldsInput label='University' type='select' name='university' value={teacherData.university} options={['BTU','Amity','CU','Other']} onChange={handleTeacherChange}/>
      <FieldsInput label='College' type='select' name='college' value={teacherData.college} options={['LIET','MITRC','NIET','Other']} onChange={handleTeacherChange}/>

      <button className={classes.button} >Submit</button>
    </form>
 </Card>
 <MessageBox
  showModal={showModal}
  handleClose={handleClose}
  title={modalContent.title}
  body={modalContent.body}
  handleConfirm={handleConfirm}

 />
</div>
  )
}

export default TeacherRegistration
