import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
const Stats = () => {
    const[paperData,setPaperData] = useState([])
    useEffect(() => {}, [])

    const options={
        title: "Papers",

    }
  return (
    <div>
      <Chart
      data={paperData}
      options={options}
      width={"100%"}
      height={"400px"}

/>
    </div>
  )
}

export default Stats
