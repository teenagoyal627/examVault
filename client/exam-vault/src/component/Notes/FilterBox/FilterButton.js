import React, { useRef, useState } from 'react'
import ModalFilter from './ModalFilter'
import classes from '../Search/Search.module.css'

const FilterButton = (
  {
    setFilters,
    handleFilter,
    filters,
    setSearchParams,
    searchParams
  }) => {
  
  const[showFilterModal,setShowFilterModal]=useState(false)
  const modalRef=useRef(null)

  return (
    <div>
      <button type='button' className={classes.searchButton} onClick={()=>setShowFilterModal(true)}>Apply Filter</button>
      {showFilterModal && (
        <ModalFilter 
        modalRef={modalRef}
        handleClose={()=>setShowFilterModal(false)}
        setFilters={setFilters}
        handleFilter={handleFilter}
        currentFilters={filters}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        />
        
      )}
    </div>
  )
}

export default FilterButton
