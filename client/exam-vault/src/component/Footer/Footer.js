import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <footer className="simple-footer">
    <div className="container">
      <p>© {new Date().getFullYear()} Notes & Papers Hub. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer
