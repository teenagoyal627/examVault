import React, { useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MessageBox from '../MessageBox';
import './Navbar.css';
import { AuthContext } from './AuthContext';

const AllPaperNavBar = () => {
  const {userRole}=useContext(AuthContext)
  console.log(userRole)
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: ""
  });

  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogoutClick = () => {
    setModalContent({
      title: "Logout",
      body: "Do you really want to logout from the dashboard?"
    });
    setShowModal(true);
  };

  const handleConfirmLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem("isAuthenticated", "false");
    navigate('/login_form');
    setShowModal(false);
  };

  return (
    <header className='header'>
        <h3 className='logo-link'>Exam Vault</h3>
        
      <nav>
        <ul>
          <li><a href='/all_paper' className={`link ${location.pathname === '/all_paper' ? 'active' : ''}`}>Home</a></li>
          <li><a href='/upload_paper' className={`link ${location.pathname === '/upload_paper' ? 'active' : ''}`}>Upload Paper</a></li>
          <li><a href='/my_paper' className={`link ${location.pathname === '/my_paper' ? 'active' : ''}`}>My Paper</a></li>
          <li><a href='/stats' className={`link ${location.pathname === '/stats' ? 'active' : ''}`}>Stats</a></li>
          
          {userRole === 'teacher' && (
            <li><a href='/new_papers' className={`link ${location.pathname === '/new_papers' ? 'active' : ''}`}>New Papers</a></li>
          )}
          <li className='logout' onClick={handleLogoutClick}>Logout</li>
        </ul>
      </nav>

      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmLogout}
        title={modalContent.title}
        body={modalContent.body}
      />
    </header>
  );
};

export default AllPaperNavBar;
