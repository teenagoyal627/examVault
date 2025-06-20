import React from 'react'
import { Outlet } from 'react-router'
import AllPaperNavBar from '../../Navbar/AllPaperNavBar'

const AllPaper = () => {
  return (
    <>
    <AllPaperNavBar/>
    <Outlet/>
    </>            
  )
}

export default AllPaper
