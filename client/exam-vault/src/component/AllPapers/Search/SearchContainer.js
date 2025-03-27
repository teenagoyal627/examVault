import React, {useEffect, useState } from 'react'
import './Search.css'
import FilterButton from '../FilterBox/FilterButton'
import AppliedFilters from '../FilterBox/AppliedFilters'

const SearchContainer = ({
  query,
  handleInputChange,
  handleSearch,
  setFilters,
  filters
}) => {

  return (
    
    <div className="search-container">
      <div className="search-top-row">
    <input
      type="text"
      placeholder="Search for papers"
      value={query}
      onChange={handleInputChange}
      className="search-input"
    />
    
    <button onClick={handleSearch} className="search-button">
      Search
    </button>

    <FilterButton
     setFilters={setFilters} 
     handleFilter={handleSearch}
     filters={filters}
    />
      </div>
    <div className='applied-filters-section'>
    <AppliedFilters filters={filters} setFilters={setFilters}/>
    </div>
  </div>

  )
}

export default SearchContainer
