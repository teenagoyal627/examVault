import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import "./Stats.css"; 

const DepartmentPieChart = () => {
  const[loading,setLoading]=useState(true)
  const[departmentData,setDepartmentData]=useState([])

  useEffect(() => {
    fetchData();
  }, []);

  const apiUrl = `${process.env.REACT_APP_APIURL}`;

  const fetchData = async () => {
    await axios.get(`${apiUrl}/department_stats`)
      .then((response) => {
        setDepartmentData(response.data);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pieChartData = departmentData
    ? [
        ["Status", "Number of Papers"],
        ["CSE", departmentData.CSE],
        ["ME", departmentData.ME],
        ["EE", departmentData.EE],
        ["CIVIL", departmentData.CIVIL],
        ["Other", departmentData.Other],
      ]
    : [["Status", "Number of Papers"]];

 const options={
  backgroundColor:"transparent",
  pieSliceText: "value",
  colors: ["#1E90FF", "#FFA500", "#8B0000",'#FFD700','#808080']
 }

  return (

    <>
     {loading && (
        <div className="loading-backdrop">
          <div className="loading-box">
            <div className="loading-spinner"></div>
            <div className="loading-text">Retrieving Stats, this might take a moment...</div>
          </div>
        </div>
      )}
  
          <div className='card-box'>
        <h2>Department-wise Paper Submission Statistics </h2>
        <div className="chart-container">
          <Chart
            chartType="PieChart"
            data={pieChartData}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        </div>
      </div>
      </>
  );
};

export default DepartmentPieChart;
