import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import "./Stats.css"; 

const Stats = () => {
  const [paperData, setPaperData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const apiUrl = `${process.env.REACT_APP_APIURL}`;

  const fetchData = async () => {
    await axios
      .get(`${apiUrl}/stats`)
      .then((response) => {
        setPaperData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pieChartData = paperData
    ? [
        ["Status", "Number of Papers"],
        ["Pending", paperData.pending],
        ["Approved", paperData.approved],
        ["Rejected", paperData.rejected],
      ]
    : [["Status", "Number of Papers"]];

 const options={
  backgroundColor:"transparent",
  pieSliceText: "value",
  colors: ["rgb(255, 165, 0)", "#4CAF50", "rgb(220, 53, 69)"]
 }

  return (
    <div className="stats-container">
      <div className='card-box'>
        <h2>Paper Review Statistics </h2>
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
    </div>
  );
};

export default Stats;
