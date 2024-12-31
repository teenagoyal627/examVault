import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classes from '../MyPaper/MyPaper.module.css';
import { viewHandler } from '../MyPaper/MyPaperUtility';
import { useNavigate } from 'react-router';


const CommunityPaper = () => {
  const [paperData, setPaperData] = useState([]);
    const navigate=useNavigate()
  const apiUrl = `${process.env.REACT_APP_APIURL}`


  useEffect(() => {
   fetchData()
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/all_paper`);
      setPaperData(response.data);
    } catch (error) {
      console.error("Error fetching papers:", error);
    }
  };

  const CreatedAtDate=(inputDate)=>{
    const date=new Date(inputDate);
    return date.toLocaleDateString('en-US', {
      year:'numeric',
      month:'long',
      day:'numeric',
      weekday:'long'
    })
  }


  return (
    <div className={classes.paperContainer} >
      {paperData.map((data, index) => (
        <div key={index} className={classes.paperCard}>
      <div className={classes.imageContainer}>
      {data.file_url.endsWith('.pdf')? (
        <iframe
        src={data.file_url}
        title="PDF Preview"
        style={{ width: '100%', height: '200px', border: 'none' }}
        ></iframe>
      ):(
        <img
        src={data.file_url}
        alt='Paper'
        className={classes.paperImage}
        />
      )}
      </div>
      <div className={classes.paperDetails}>
       <table className={classes.paperTable}>
    <tbody>
      <tr>
        <td><strong>Exam Type</strong></td>
        <td>{data.exam_type}</td>
      </tr>
      <tr>
        <td><strong>Paper Type</strong></td>
        <td>{data.paper_type}</td>
      </tr>      
      <tr>
        <td><strong>Subject</strong></td>
        <td>{data.subject}</td>
      </tr>
      <tr>
        <td><strong>Department</strong></td>
        <td>{data.department}</td>
      </tr>
      <tr>
        <td><strong>Year/Semester</strong></td>
        <td>{data.year} Year {  data.semester} Semester</td>
      </tr>
      <tr>
        <td><strong>Uploaded At</strong></td>
        <td>{CreatedAtDate(data.created_at)}</td>
      </tr>
      <tr>
        <td><strong>Approval Status</strong></td>
        <td style={{color:"green"}}>{data.approval_status}</td>
      </tr>
      <tr>
        <td><strong>Approved By</strong></td>
        <td>{data.approved_by}</td>
      </tr>
    </tbody>
  </table>
  <button style={{width:"100%"}} onClick={()=>viewHandler(data._id,navigate)} className={classes.Button}>View</button>
</div>


        </div>
      ))}
    </div>
  );
};

export default CommunityPaper;
