import React from 'react'
import { Navbar } from 'responsive-navbar-react'
import 'responsive-navbar-react/dist/index.css'

const FrontPageNavbar = () => {

  const props = {
    items: [
      {
        text: 'Home',
        link:'/#'
      },
      {
        text:'Features',
        link:'/#features'
      },
      {
        text:'About',
        link:'/#about'
      },
      {
        text:'Registration',
        link:'/registration'
      },
      {
        text: 'Login',
        link: '/login_form'
      }
    ],
    // logo: {
    //   text: 'Notes & Papers Hub',
    //   link:'/'
    // },
    logo: {
      text: (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="Images/logo2.jpg"
            alt="Logo"
            style={{
              height: '70px',
              width: '70px',
              marginRight: '10px',
              marginTop:"10px"

            }}
          />
          Notes & Papers Hub
        </span>
      ),
      link: '/'
    },
    style: {
      barStyles: {
        background: 'transparent',
        fontSize:"1.35rem",
        color:"black",
        boxShadow:"none"
      },
      sidebarStyles: {
        background: '#fff',
        color:'black',
        buttonColor: 'black'
      }, 
      linkStyles:{
        textDecoration:'none',
        color:'black',
        fontWeight:'500',
        padding:'20px',
      },
      logoStyles: {
        fontWeight: '400',
        fontSize: '1.9rem',
        color: 'black',

      }

    }
  }
  return <Navbar {...props} />
}

export default FrontPageNavbar