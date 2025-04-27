import React from 'react'
import { Outlet } from 'react-router'
import AllPaperNavBar from '../../Navbar/AllPaperNavBar'

const AllPaper = () => {
  return (
    <div>
    <AllPaperNavBar/>
    <Outlet/>
  
    </div>            
  )
}

export default AllPaper
