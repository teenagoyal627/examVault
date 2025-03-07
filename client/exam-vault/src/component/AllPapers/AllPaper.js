import React from 'react'
import { Outlet } from 'react-router'
import AllPaperNavBar1 from '../Navbar/AllPaperNavBar1'

const AllPaper = () => {
  return (
    <div>
    <AllPaperNavBar1/>
    <Outlet/>
  
    </div>            
  )
}

export default AllPaper
