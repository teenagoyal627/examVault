import React, {useEffect, useState } from 'react'
import classes from './Search.module.css'
import FilterButton from '../FilterBox/FilterButton'
import AppliedFilters from '../FilterBox/AppliedFilters'

const SearchNotesContainer = ({
  query,
  handleInputChange,
  handleSearch,
  setFilters,
  filters,
  setSearchParams,
  searchParams
}) => {

  return (
    
    <div className={classes.searchContainer}>
      <div className={classes.searchTopRow}>
    <input
      type="text"
      placeholder="Search on title"
      value={query}
      onChange={handleInputChange}
      className={classes.searchInput}
    />
    
    <button onClick={handleSearch} className={classes.searchButton}>
      Search
    </button>

    <FilterButton
     setFilters={setFilters} 
     handleFilter={handleSearch}
     filters={filters}
     setSearchParams={setSearchParams}
     searchParams={searchParams}
    />
      </div>
    <div className='applied-filters-section'>
    <AppliedFilters filters={filters} setFilters={setFilters} handleSearch={handleSearch} setSearchParams={setSearchParams} searchParams={searchParams} />
    </div>
  </div>

  )
}

export default SearchNotesContainer
