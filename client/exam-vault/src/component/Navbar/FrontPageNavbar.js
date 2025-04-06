import React from 'react'
import { Navbar } from 'responsive-navbar-react'
import 'responsive-navbar-react/dist/index.css'

const FrontPageNavbar = () => {

  const props = {
    items: [
      {
        text: 'Registration',
        link:'/registration'
      },
      {
        text: 'Login',
        link: '/login_form'
      }
    ],
    logo: {
      text: 'Notes & Papers Hub',
      link:'/'
    },
    style: {
      barStyles: {
        background: 'rgb(61, 62, 60)',
        fontSize:"1.35rem",
      },
      sidebarStyles: {
        background: '#222',
        buttonColor: 'white'
      }, 

    }
  }
  return <Navbar {...props} />
}

export default FrontPageNavbar