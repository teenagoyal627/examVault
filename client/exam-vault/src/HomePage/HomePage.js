import React from 'react'
import FrontPageNavbar from '../component/Navbar/FrontPageNavbar'
import TextFrontPage from './TextFrontPage'
import Footer from '../component/Footer/Footer'

const HomePage = () => {
  return (
    <div>
    <FrontPageNavbar/>
      <TextFrontPage/>
      <Footer/>
    </div>
  )
}

export default HomePage
