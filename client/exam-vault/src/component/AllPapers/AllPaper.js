import React from 'react'
import AllPaperNavBar from '../Navbar/AllPaperNavBar'
import { Outlet } from 'react-router'

const AllPaper = () => {
  return (
    <div>
    <AllPaperNavBar />
    <Outlet/>
  
    </div>            
  )
}

export default AllPaper
