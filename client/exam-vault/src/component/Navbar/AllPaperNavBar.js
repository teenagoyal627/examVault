import React from 'react'

import { Navbar } from 'responsive-navbar-react'
import 'responsive-navbar-react/dist/index.css'

const AllPaperNavBar = () => {
  const props = {
    items: [
      {
        text: 'Home',
        link: '/all_paper'
      },
      {
        text: 'Upload Papers',
        link: '/upload_paper'
      },
      {
        text: 'My Papers',
        link: '/my_paper'
      },
      {
        text: 'Stats',
        link: '/stats'
      }
    ],
    logo: {
      text: 'Responsive Navbar React'
    },
    style: {
      barStyles: {
        background: 'rgb(165, 195, 142)'
      },
      sidebarStyles: {
        background: '#222',
        buttonColor: 'white'
      }
    }
  }
  return <Navbar {...props} />
}

export default AllPaperNavBar