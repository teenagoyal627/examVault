import React, { useState } from 'react'
import  './Navbar.css'
import MessageBox from '../MessageBox';
import { useLocation, useNavigate } from 'react-router';
import { Link } from '@mui/material';

const AllPaperNavBar = () => {
    const[showModal,setShowModal]=useState(false)
    const [modalContent,setModalContent]=useState({
        title:"",
        body:""
    })
    const navigate=useNavigate()
  const location=useLocation()



const handleClick=()=>{
    setModalContent({
      title:"Logout",
      body:"Do you really want to logout form dashboard."
    })
    setShowModal(true)
    // history.replace('/login')
  }
  
const handleConfirm=()=>{
    localStorage.clear()
    sessionStorage.clear()
    localStorage.setItem("isAuthenticated", "false");
    navigate('/login_form')
    setShowModal(false)
   
  }
  return (
    <header className='header'>
      <div className='logo-container'>
        <Link to='/ngoPage' className='logo-link'>
          <h3 className='ngo-name short-name'>Exam Vault </h3>
        </Link> 
      </div>
     
      <nav>
        <ul>
          <li><Link to='/form' className={`link ${location.pathname === '/form' ? 'active':''}`}>Home</Link></li>
          <li><Link to='/patientdata' className={`link ${location.pathname === '/patientdata' ? 'active':''}`}>Upload Paper</Link></li>
          <li><Link to='/stats' className={`link ${location.pathname === '/stats' ? 'active':''}`}>My Paper</Link></li>
          <li><Link to='/stats' className={`link ${location.pathname === '/stats' ? 'active':''}`}>Stats</Link></li>
          <li><Link to='/stats' className={`link ${location.pathname === '/stats' ? 'active':''}`}>New Paper</Link></li>
         <li className='logout' onClick={handleClick}>Logout</li>
        </ul>
      </nav>
      
      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={()=>handleConfirm()}
        title={modalContent.title}
        body={modalContent.body}
      />
    </header>
  );
}
export default AllPaperNavBar
