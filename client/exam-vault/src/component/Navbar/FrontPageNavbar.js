import React from 'react'
import { Link } from 'react-router'
import classes from './Navbar.module.css'
const FrontPageNavbar = () => {
  return (
   <nav className={classes.navbar}>
   <div> 
   <a href="/" className={classes.title}>Exam Vault</a>
   </div>
    <ul className={classes.navLinks}>
        <Link to='/login_form' className={classes.li}><li>Login</li></Link>
    </ul>
   </nav>
  )
}

export default FrontPageNavbar
