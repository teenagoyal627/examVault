// import React from 'react'
// import { Link } from 'react-router'
// import classes from './Navbar.module.css'
// const FrontPageNavbar = () => {
//   return (
//    <nav className={classes.navbar}>
//    <div> 
//    <a href="/" className={classes.title}>Exam Vault</a>
//    </div>
//     <ul className={classes.navLinks}>
//         <Link to='/login_form' className={classes.li}><li>Login</li></Link>
//     </ul>
//    </nav>
//   )
// }

// export default FrontPageNavbar


import React from 'react'

import { Navbar } from 'responsive-navbar-react'
import 'responsive-navbar-react/dist/index.css'

const FrontPageNavbar = () => {
  const props = {
    items: [
      {
        text: 'Login',
        link: '/login_form'
      },
     
    ],
    logo: {
      text: 'Exam Vault',
      link:'/'
    },
    style: {
      barStyles: {
        background: 'rgb(66, 67, 64)'
      },
      sidebarStyles: {
        background: '#222',
        buttonColor: 'white'
      }
    }
  }
  return <Navbar {...props} />
}

export default FrontPageNavbar