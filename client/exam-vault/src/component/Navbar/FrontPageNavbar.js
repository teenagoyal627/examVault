import React from 'react'
import { Navbar } from 'responsive-navbar-react'
import 'responsive-navbar-react/dist/index.css'

const FrontPageNavbar = () => {

 const props = {
  items: [
    { text: 'Home', link: '/#' },
    { text: 'Features', link: '/#features' },
    { text: 'About', link: '/#about' },
    { text: 'Registration', link: '/registration' },
    { text: 'Login', link: '/login_form' }
  ],
  logo: {
    text: (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="Images/logo2.jpg"
          alt="Logo"
          style={{
            height: window.innerWidth < 768 ? '40px' : '50px',
            width: window.innerWidth < 768 ? '40px' : '50px',
            marginTop: '10px',
          }}
        />
        Notes & Paper Hub
      </span>
    ),
    link: '/'
  },
  style: {
    barStyles: {
      background: 'white',
      fontSize: '20px',
      fontWeight: '500',
      color: 'black',
      boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
      padding: '10px 40px',
      borderBottom: '1px solid #e0e0e0'
    },
    linkStyles: {
      textDecoration: 'none',
      color: 'black',
      fontWeight: '500',
      padding: '8px 14px',
      borderRadius: '6px',
      transition: 'background 0.3s ease'
    },
    logoStyles: {
      fontWeight: '600',
      fontSize: window.innerWidth < 768 ? '1.2rem' : '1.5rem',
      color: 'black'
    },
    sidebarStyles: {
      background: '#fff',
      color: 'black',
      buttonColor: 'black'
    }
  }
};

  return <Navbar {...props} />
}

export default FrontPageNavbar