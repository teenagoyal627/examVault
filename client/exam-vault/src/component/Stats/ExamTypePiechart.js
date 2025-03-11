import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import "./Stats.css"; 

const ExamTypePieChart = () => {
  const[examTypeData,setExamTypeData]=useState([])

  useEffect(() => {
    fetchData();
  }, []);

  const apiUrl = `${process.env.REACT_APP_APIURL}`;

  const fetchData = async () => {
    await axios.get(`${apiUrl}/papers/exam_type_stats`)
      .then((response) => {
        setExamTypeData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pieChartData = examTypeData
    ? [
        ["Status", "Number of examTypeData"],
        ["University", examTypeData.University],
        ["Midterm", examTypeData.Midterm],
        ["Improvement", examTypeData.Improvement],
        ["Other", examTypeData.Other]
      ]
    : [["Status", "Number of examTypeData"]];

 const options={
  backgroundColor:"transparent",
  pieSliceText: "value",
  colors:['#9C27B0','#FF5733','#4CAF50','#007BFF'  ]
 }

  return (
      <div className='card-box'>
        <h2>Exam Type-Based Submission Analysis </h2>
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

  );
};

export default ExamTypePieChart;
