import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import "./Stats.css"; 

const PaperTypePieChart = () => {
  const[paperTypeData,setPaperTypeData]=useState([])

  useEffect(() => {
    fetchData();
  }, []);

  const apiUrl = `${process.env.REACT_APP_APIURL}`;

  const fetchData = async () => {
    await axios.get(`${apiUrl}/paper_type_stats`)
      .then((response) => {
        setPaperTypeData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pieChartData = paperTypeData
    ? [
        ["Status", "Number of Papers"],
        ["Main", paperTypeData.Main],
        ["Back", paperTypeData.Back],
        ["Other", paperTypeData.Other],
      ]
    : [["Status", "Number of Papers"]];

 const options={
  backgroundColor:"transparent",
  pieSliceText: "value",
  colors:['#FFA9FD','#3E00FF','#7AFDEB']
 }

  return (
      <div className='card-box'>
        <h2>Breakdown of Paper Types (Main, Back, Others)</h2>
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

export default PaperTypePieChart;
