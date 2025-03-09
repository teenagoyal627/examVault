import React, {useEffect, useState } from 'react'
import './Search.css'
import FilterButton from '../FilterBox/FilterButton'

const SearchContainer = ({
  query,
  handleInputChange,
  handleSearch,
  setFilters
}) => {

  return (
    
    <div className="search-container">
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
    />
  </div>

  )
}

export default SearchContainer
