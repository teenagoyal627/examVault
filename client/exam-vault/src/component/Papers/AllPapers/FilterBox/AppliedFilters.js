import React from 'react'
import './Filter.css'

const AppliedFilters = ({filters,setFilters,handleSearch,searchParams,setSearchParams}) => {
    console.log(filters,setFilters)

    const handleRemoveFilter=(filterKey)=>{
        searchParams.delete(filterKey)
        setSearchParams(searchParams)
        setFilters((prevFilters)=>{
            const updated={
                ...prevFilters,
                [filterKey]:''
            }
            setTimeout(()=>{
                handleSearch()
            },0)
            console.log(updated)
            return updated
            
        })
    }

    const appliedFilters=Object.entries(filters).filter(([_,value])=>value)
    console.log("appliedFilters",appliedFilters)
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
