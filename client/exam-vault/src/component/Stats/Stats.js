import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
const Stats = () => {
    const[paperData,setPaperData] = useState([])
    useEffect(() => {
        fetchData()
    }, [])
    const apiUrl = `${process.env.REACT_APP_APIURL}`

    const fetchData=async()=>{
      await axios.get(`${apiUrl}/stats`)
    //    console.log(dataResponse)
        .then((response)=>{
            console.log(response.data)
            setPaperData(response.data)
        }).catch((error)=>{
            console.log(error)
        })
} 
const pieChartData = paperData
? [
    ["Status", "Number of Papers"],
    ["Pending", paperData.pending],
    ["Approved", paperData.approved],
    ["Rejected", paperData.rejected],
  ]
: [["Status", "Number of Papers"]];
    const options={
        title: "Papers",

    }
  return (
    <div>
        {console.log("the paper idata is ",paperData)}
      <Chart
       chartType="PieChart"
      data={pieChartData}
      options={options}
      width={"100%"}
      height={"400px"}

/>
    </div>
  )
}

export default Stats
