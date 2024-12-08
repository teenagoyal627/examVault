import React from 'react'
import './Card.css'
const Card = (props) => {
  return (
    <div className='all-card-ui'> 
      {props.children}
    </div>
  )
}

export default Card
