
import React, { useState } from "react";
import './Filter.css'
import FieldsInput from "../../Authentication/Registration/Forms/FieldsInput";
import subjects from "../UploadPaper/Subject";
import axios from "axios";

const ModalFilter = ({
  modalRef,
  handleClose,
  setFilters,
  handleFilters
}) => {
  const [filters, updateFilters] = useState({
    subject: "",
    year: "",
    semester: "",
    department: "",
    exam_type: "",
    paper_type: "",
  });


  const handleFilterChange = (e) => {
    const { name, value } = e.target
    updateFilters((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const applyFilters = () => {
    setFilters(filters);
    handleFilters(); 
    handleClose(); 
  };


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
                  required={true}
                  options={subjects}
                  style={{ width: "1rem" }}
                />
                <FieldsInput
                  label='Department'
                  type='select'
                  name='department'
                  value={filters.department}
                  onChange={handleFilterChange} required={true}
                  options={['CSE', 'CIVIL', 'ME', 'EE', 'Other']}
                />
                <FieldsInput
                  label='Year'
                  type='select'
                  name='year'
                  value={filters.year}
                  onChange={handleFilterChange} required={true}
                  options={['1st', '2nd', '3rd', '4th']}
                />
                <FieldsInput
                  label='Semester'
                  type='select'
                  name='semester'
                  value={filters.semester}
                  onChange={handleFilterChange} required={true}
                  options={['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']}
                />
                <FieldsInput
                  label='Paper Type'
                  type='select'
                  name='paper_type'
                  value={filters.paper_type}
                  onChange={handleFilterChange} required={true}
                  options={['Main', 'Back', 'Other']}
                />
                <FieldsInput
                  label='Exam Type'
                  type='select'
                  name='exam_type'
                  value={filters.exam_type}
                  onChange={handleFilterChange} required={true}
                  options={['University', 'Midterm', 'Improvement', 'Other']}
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
