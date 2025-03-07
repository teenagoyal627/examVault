import React, { useEffect, useState } from 'react';
import classes from '../MyPaper/MyPaper.module.css';
import { viewHandler } from '../MyPaper/MyPaperUtility';
import { useNavigate } from 'react-router';
import PaperTabular from '../PaperTabular';
import ImageUpload from '../ImageUpload';
import axios from 'axios';
import '../LoadingSpinner.css'
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';


const CommunityPaper = () => {
  const [paperData, setPaperData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)


  const navigate = useNavigate()

  const apiUrl = `${process.env.REACT_APP_APIURL}`

  
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
            <p>No papers found. Please upload a paper to continue.</p>
            <button onClick={() => navigate('/upload_paper')} className={classes.uploadButton}>
              Upload Paper
            </button>
          </div>
        )}
      {loading && (
        <div className="loading-backdrop">
          <div className="loading-box">
            <div className="loading-spinner"></div>
            <div className="loading-text">Retrieving papers, this might take a moment...</div>
          </div>
        </div>
      )}
      {paperData.length>0 && (
        <>
        <Search/>
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
      </>
      )}
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
