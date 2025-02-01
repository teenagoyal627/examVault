import React, { useEffect, useState } from 'react';
import classes from '../MyPaper/MyPaper.module.css';
import { viewHandler } from '../MyPaper/MyPaperUtility';
import { useNavigate } from 'react-router';
import "./Search.css";
import PaperTabular from '../PaperTabular';
import ImageUpload from '../ImageUpload';
import SearchContainer from '../SearchContainer';
import axios from 'axios';
import '../LoadingSpinner.css'
import Pagination from '../Pagination/Pagination';


const CommunityPaper = () => {
  const [paperData, setPaperData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)


  const navigate = useNavigate()

  const apiUrl = `${process.env.REACT_APP_APIURL}`

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (query.trim() === "") {
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
      const response = await axios.get(`${apiUrl}/all_paper`);
      setPaperData(response.data || []);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching papers:", error);
      setLoading(true)
    }
  };

  const recordsPerPage = 12;
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage;
  const records = paperData.slice(firstIndex, lastIndex)
  const numberOfPages = Math.ceil(paperData.length / recordsPerPage)
  const numbers = [...Array(numberOfPages).keys()].map((n) => n + 1)


  return (
    <>
     {paperData.length === 0 && !loading && (
          <div className={classes.noPaperMessage}>
            <p>You have not uploaded any papers yet. Please upload a paper first.</p>
            <button onClick={() => navigate('/upload_paper')} className={classes.uploadButton}>
              Upload Paper
            </button>
          </div>
        )}

      {paperData.length > 0 && (
        <SearchContainer query={query} handleInputChange={handleInputChange} handleSearch={handleSearch} />

      )}
      {loading && (
        <div className="loading-backdrop">
          <div className="loading-box">
            <div className="loading-spinner"></div>
            <div className="loading-text">Retrieving papers, this might take a moment...</div>
          </div>
        </div>
      )}
      <div className={classes.paperContainer} >
        {records.map((data, index) => (
          <div key={index} className={classes.paperCard}>
            <ImageUpload data={data} />
            <div className={classes.paperDetails}>
              <PaperTabular data={data} approvedBy={true} />
              <button style={{ width: "100%" }} onClick={() => viewHandler(data._id, navigate)} className={classes.Button}>View</button>
            </div>


          </div>
        ))}
      </div>
      {paperData.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          numbers={numbers}
        />
      )}

    </>

  );
};

export default CommunityPaper;
