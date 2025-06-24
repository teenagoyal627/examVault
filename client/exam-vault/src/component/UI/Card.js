import React from 'react'
import './Card.css'
const Card = ({children,height,marginTop,width}) => {
  return (
    <div className='all-card-ui' style={{height:height,marginTop:marginTop,width:width}}> 
      {children}
    </div>
  )
}

export default Card
