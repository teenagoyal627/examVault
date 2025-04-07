import React from 'react'
import './Filter.css'

const AppliedFilters = ({filters,setFilters}) => {
    console.log(filters,setFilters)

    const handleRemoveFilter=(filterKey)=>{
        setFilters((prevFilters)=>({
            ...prevFilters,
            [filterKey]:''
        }))
    }

    const appliedFilters=Object.entries(filters).filter(([_,value])=>value)
  return (
    <>
        {appliedFilters.length>0 ? (
            <div>
                {appliedFilters.map(([key,value])=>(
                       <span key={key} className='filter-badge' title={`${key.toUpperCase()}`}>
                      {`${value.toUpperCase()}`}
                        <button onClick={()=>handleRemoveFilter(key)} className='remove-btn'>x</button>
                       </span>
                ))}
                <p style={{marginTop:"1rem",maxWidth:"100%"}} className='applied-filter-badge'>{appliedFilters.length} Applied Filters</p>

            </div>
        ) : (<p>No Filters applied....</p>)}
      
    </>
  )
}

export default AppliedFilters
