import React from 'react'
import classes from './Fields.module.css'
const FieldsInput = ({label,type,name,value,options,onChange}) => {
  return (
    <div className={classes.teacherForm}>
      <label>{label}</label>
      {type==='select' ? (
        <select name={name} value={value} onChange={onChange} >
            <option>Select {label}</option>
            {options.map((option,index)=>(
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
      ):(
         <input type={type} name={name} value={value} onChange={onChange} />
      )
      }
    </div>
  )
}

export default FieldsInput
