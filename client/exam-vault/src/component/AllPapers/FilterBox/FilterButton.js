import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import ModalFilter from './ModalFilter'

const FilterButton = ({setFilters,handleFilter}) => {
  
  const[showFilterModal,setShowFilterModal]=useState(false)
  const modalRef=useRef(null)

  return (
    <div>
      <button type='button' className='search-button' onClick={()=>setShowFilterModal(true)}>Apply Filter</button>
      {showFilterModal && (
        <ModalFilter 
        modalRef={modalRef}
        handleClose={()=>setShowFilterModal(false)}
        setFilters={setFilters}
        handleFilter={handleFilter}
        />
        
      )}
    </div>
  )
}

export default FilterButton
