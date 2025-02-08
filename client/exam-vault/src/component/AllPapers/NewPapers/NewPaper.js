import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import classes from '../MyPaper/MyPaper.module.css';
import { viewHandler } from '../MyPaper/MyPaperUtility';
import PaperTabular from '../PaperTabular';
import SearchContainer from '../SearchContainer';
import ImageUpload from '../ImageUpload';
import Pagination from '../Pagination/Pagination';


const NewPaper = () => {
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
      const response = await axios.get(`${apiUrl}/new_papers`);
      setPaperData(response.data || []);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching papers:", error);
      setLoading(false)
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
          <p>No papers are currently available for approval. Once students upload their papers, you will see them here for review.</p>
          <button onClick={() => navigate('/all_paper')} className={classes.uploadButton}>
            All Paper
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
            <div className="loading-text">Please wait, data is loading...</div>
          </div>
        </div>
      )}
      <div className={classes.paperContainer} >
        {records.map((data, index) => (
          <div key={index} className={classes.paperCard}>
            <ImageUpload data={data} />
            <div className={classes.paperDetails}>
              <PaperTabular data={data} approvedBy={false} />

              <button style={{ width: "100%", padding: ".5rem" }} onClick={() => viewHandler(data._id, navigate)} className={classes.Button}>Review and Approve</button>
              <div >
              </div>
            </div>
          </div>
        ))}
      </div>
      {paperData.length > 0 && (
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

export default NewPaper;
