import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import classes from '../MyPaper/MyPaper.module.css';
import { viewHandler } from '../MyPaper/MyPaperUtility';
import PaperTabular from '../PaperTabular';
import ImageUpload from '../ImageUpload';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';


const NewPaper = () => {
  const [paperData, setPaperData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchResults, setSearchResults] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const[searchParams,setSearchParams]=useSearchParams() 
  const navigate = useNavigate()
  const apiUrl = `${process.env.REACT_APP_APIURL}`


  useEffect(()=>{
      const pageFromParams=parseInt(searchParams.get("page") || "1")
      setCurrentPage(pageFromParams)
    },[searchParams])


  useEffect(() => {
    fetchData()
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/papers/new_papers`);
      console.log(response.data)
      setPaperData(response.data ||[]);
      setSearchResults([])
      console.log(searchResults)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching papers:", error);
      setLoading(false)
    }
  };


  const recordsPerPage = 12;
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage;
  const activeData =searchResults.length>0 ? searchResults : paperData
  console.log(activeData)
  const records =  searchResults && searchResults.length > 0 
  ? activeData.slice(firstIndex, lastIndex)
  : paperData
  const numberOfPages = Math.ceil((paperData.length || 1) / recordsPerPage)
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
      {isModalOpen ? (
        <div className={classes.noPaperMessage}>
          <p>No Search results found.....</p>
          <button onClick={() => setIsModalOpen(false)} className={classes.uploadButton}>
            Okay
          </button>
        </div>
      ) : loading ? (
        <div className="loading-backdrop">
          <div className="loading-box">
            <div className="loading-spinner"></div>
            <div className="loading-text">Please wait, data is loading...</div>
          </div>
        </div>
      ) : paperData.length >0 && (
        <>
        {console.log(paperData)}
        <Search
           paperData={paperData} 
           setSearchResults={setSearchResults} 
           setIsModalOpen={setIsModalOpen}
           setCurrentPage={setCurrentPage} 
           searchResults={searchResults}
           defaultParams={{paper_approval_status:"Pending"}}
           />

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
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            numberOfPages={numberOfPages}
            numbers={numbers}
            onPageChange={(pageNum)=>{
              const params=new URLSearchParams(searchParams.toString())
              params.set("page",pageNum)
              setSearchParams(params)
            }}
          />
        </>
      )}

    </>

  );
};

export default NewPaper;
