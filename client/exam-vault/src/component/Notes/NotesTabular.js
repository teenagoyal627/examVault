import React, { useEffect } from "react";
import classes from '../../Papers/AllPapers/MyPaper/MyPaper.module.css';

const NotesTabular = ({ data, approvedBy }) => {
  
  const CreatedAtDate = (inputDate) => {
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long"
    });
  };

  return (
    <div >
      <table className={classes.paperTable}>
        <tbody>
         
        <tr>
            <td>
              <strong>Title</strong>
            </td>
            <td>
              {data.title}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Year/Sem</strong>
            </td>
            <td>
              {data.year} Year/{data.semester} Semester
            </td>
          </tr>

          <tr>
            <td>
              <strong>Department</strong>
            </td>
            <td>{data.department}</td>
          </tr>
         
          <tr>
            <td>
              <strong>Subject</strong>
            </td>
            <td>{data.subject}</td>
          </tr>

          <tr>
            <td>
              <strong>Unit No</strong> 
            </td>
            <td>{data.unit_no}</td>
          </tr>
          <tr>
            <td>
              <strong>Uploaded By</strong>
            </td>
            <td>{data.uploaded_by}</td>
          </tr>
          <tr>
            <td>
              <strong>Uploaded At</strong>
            </td>
            <td>{CreatedAtDate(data.created_at)}</td>
          </tr>
          
          {
            data.download_count >0 &&(
          <tr>
            <td><strong>Download Count</strong></td>
            <td>{data.download_count}</td>
          </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default NotesTabular;
