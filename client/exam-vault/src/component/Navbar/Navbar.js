import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
   <header>
   <nav>
    <ul>
        <li><Link to='/university'>University</Link></li>
        <li><Link to='/midterm'>Mid-Term</Link></li>
        <li><Link to='/improvement'>Improvement</Link></li>

    </ul>
   </nav>
   </header>
  )
}

export default Navbar
