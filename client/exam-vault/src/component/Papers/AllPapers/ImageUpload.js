import React from 'react'
import classes from './MyPaper/MyPaper.module.css'
const ImageUpload = ({data}) => {
  return (
    <div className={classes.imageContainer}>
          {data.file_url.endsWith('.pdf')? (
            <iframe
            src={data.file_url}
            title="PDF Preview"
            style={{ width: '100%', height: '200px', border: 'none' }}
            ></iframe>
          ):(
            <img
            src={data.file_url}
            alt='Paper'
            className={classes.paperImage}
            />
          )}
          </div>
  )
}

export default ImageUpload
