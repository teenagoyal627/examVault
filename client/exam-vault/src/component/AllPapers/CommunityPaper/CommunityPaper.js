import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classes from '../MyPaper/MyPaper.module.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const CommunityPaper = () => {
  const [paperData, setPaperData] = useState([]);
  const [userId, setUserId] = useState(null);
  const[approvalStatus,setApprovalStatus]=useState("Pending")
  const[approvalTime,setApprovalTime]=useState("null")
  const[approvedBy,setApprovedBy]=useState("Not Approved")
  const apiurl = "http://localhost:5000/all_paper";

  useEffect(() => {
   fetchData()
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiurl);
      setPaperData(response.data);
    } catch (error) {
      console.error("Error fetching papers:", error);
    }
  };

  return (
    <div className={classes.paperContainer} >
      {paperData.map((data, index) => (
        <div key={index} className={classes.paperCard}>
      <div className={classes.imageContainer}>
      <img src=""
      alt='paper' className={classes.paperImage}/>
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
        <td><strong>Semester</strong></td>
        <td>{data.semester}</td>
      </tr>
      <tr>
        <td><strong>Approval Status</strong></td>
        <td>{approvalStatus}</td>
      </tr>
      <tr>
        <td><strong>Approved By</strong></td>
        <td>{approvedBy}</td>
      </tr>
    </tbody>
  </table>
  <button className={classes.viewButton}>View</button>
</div>


        </div>
      ))}
    </div>
  );
};

export default CommunityPaper;
