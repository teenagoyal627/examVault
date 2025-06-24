import React from 'react'
import FrontPageNavbar from '../Navbar/FrontPageNavbar'
import FrontPageCard from './FrontPageCard'
import Footer from '../Footer/Footer'

const FrontPage = () => {
  return (
    <div>
    <FrontPageNavbar/>
     <FrontPageCard/>
     <Footer/>
    </div>
  )
}

export default FrontPage
