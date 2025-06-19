
import React, { useEffect, useState } from "react";
import './Filter.css'
import subjects from "../../Papers/AllPapers/UploadPaper/Subject";
import FieldsInput from "../../FormInputs/FieldsInput";

const ModalFilter = ({
  modalRef,
  handleClose,
  setFilters,
  handleFilter,
  currentFilters,
  setSearchParams,
  searchParams
}) => {

  const [filters, updateFilters] = useState({...currentFilters});

  useEffect(()=>{
    updateFilters(currentFilters)
  },[currentFilters])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    updateFilters((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
  // const applyFilters = () => {
  //   setFilters(prev => ({ ...prev, ...filters }));
  //   console.log(filters)
  //   handleClose(); 
  // };

  const applyFilters=()=>{
    const newParams=new URLSearchParams(searchParams.toString())
    Object.entries(filters).forEach(([key,value])=>{
      if(value){
        newParams.set(key,value)
      }else{
        newParams.delete(key)
      }
    })
    setSearchParams(newParams)
    handleFilter()
    handleClose()
  }


  return (
    <>
      <div
        className="modal fade show"
        style={{
          display: "block",
          background: "rgba(57, 56, 56, 0.5)",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          zIndex: "1040"
        }}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Apply Filter on Fields
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="filter-section">
                <FieldsInput
                  label='Subject'
                  type='select'
                  name='subject'
                  value={filters.subject}
                  onChange={handleFilterChange}
                  required={false}
                  options={subjects}
                  style={{ width: "1rem" }}
                />
                <FieldsInput
                  label='Department'
                  type='select'
                  name='department'
                  value={filters.department}
                  onChange={handleFilterChange} 
                  required={false}
                  options={['CSE', 'CIVIL', 'ME', 'EE', 'Other']}
                />
                <FieldsInput
                  label='Year'
                  type='select'
                  name='year'
                  value={filters.year}
                  onChange={handleFilterChange} 
                  required={false}
                  options={['1st', '2nd', '3rd', '4th']}
                />
                <FieldsInput
                  label='Semester'
                  type='select'
                  name='semester'
                  value={filters.semester}
                  onChange={handleFilterChange} 
                  required={false}
                  options={['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']}
                />
                
              </div>


            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={applyFilters}
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </div >

    </>

  );
};

export default ModalFilter;
