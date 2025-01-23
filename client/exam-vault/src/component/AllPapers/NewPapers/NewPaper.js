import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import classes from '../MyPaper/MyPaper.module.css';
import {viewHandler } from '../MyPaper/MyPaperUtility';
import PaperTabular from '../PaperTabular';
import SearchContainer from '../SearchContainer';
import ImageUpload from '../ImageUpload';


const NewPaper = () => {
  const [paperData, setPaperData] = useState([]);
  const [query, setQuery] = useState(""); 
  
  const navigate=useNavigate()
  const apiUrl = `${process.env.REACT_APP_APIURL}`

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

    const handleSearch = async () => {
      if (query.trim() === ""){
        fetchData()
        return;
      } 
      try {
        const response = await axios.get(`http://localhost:5000/papers/search_papers?title=${query}`);
        setPaperData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };


  useEffect(() => {
   fetchData()
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/new_papers`);
      setPaperData(response.data || []);
    } catch (error) {
      console.error("Error fetching papers:", error);
    }
  };


  return (
    <>
  <SearchContainer query={query} handleInputChange={handleInputChange} handleSearch={handleSearch}/>
   <div className={classes.paperContainer} >
      {paperData.map((data, index) => (
        <div key={index} className={classes.paperCard}>
        <ImageUpload data={data}/>
      <div className={classes.paperDetails}>
        <PaperTabular data={data} approvedBy={false}/>
      
  <button style={{width:"100%",padding:".5rem"}} onClick={()=>viewHandler(data._id,navigate)} className={classes.Button}>Review and Approve</button>
  <div >
  </div>
</div>
  </div>
  ))}
    </div>
    </>
   
  );
};

export default NewPaper;
