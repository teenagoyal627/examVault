import React, { useEffect, useState } from 'react';
import classes from '../../Papers/AllPapers/MyPaper/MyPaper.module.css';
import { editNotesHandler, viewHandler } from './Utility';
import { useNavigate } from 'react-router';
import ImageUpload from '../../Papers/AllPapers/ImageUpload';
import axios from 'axios';
import '../../Papers/AllPapers/LoadingSpinner.css'
import Pagination from '../../Papers/AllPapers/Pagination/Pagination';
import { getAuth } from 'firebase/auth';
import NotesTabular from './NotesTabular';
import SearchNotes from '../Search/Search';


const AllNotes = () => {
  const [notesData, setNotesData] = useState([]);
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [role, setRole] = useState(null);


  const navigate = useNavigate()

  const apiUrl = `${process.env.REACT_APP_APIURL}`

// const apiUrl="http://localhost:5003"
  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    
    try {
      const response = await axios.get(`${apiUrl}/notes/all_notes`);
      setNotesData(response.data || []);
      setLoading(false)
    } catch (error) {
      if (error.response) {
        console.error("Backend Error:", error.response.data);
        alert(`Error: ${error.response?.data?.error || 'Something went wrong'}`);      } else {
        console.error("Network or Axios error:", error.message);
      }      
      setLoading(true)
    }
    
    try {
      const auth = getAuth();
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const idToken = await user.getIdToken();
          const roleApiUrl = `${apiUrl}/login`;
  
          const getRoleResponse = await axios.get(`${roleApiUrl}/get_role`, {
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          });
          setRole(getRoleResponse.data.role);
        } else {
          console.warn("No authenticated user found.");
          setRole(null);
        }
      })
    } catch (error) {
      console.error("Error fetching user role:", error);
    }

  };

  const recordsPerPage = 12;
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage;
  const activeData = searchResults && searchResults.length > 0 ? searchResults : notesData
  const records = activeData.slice(firstIndex, lastIndex)
  const numberOfPages = Math.ceil((activeData.length || 1) / recordsPerPage)
  const numbers = [...Array(numberOfPages).keys()].map((n) => n + 1)


  return (
    <>
      {isModalOpen ? (
        <div className={classes.noPaperMessage}>
          <p>No Search results found.....</p>
          <button onClick={() =>setIsModalOpen(false)} className={classes.uploadButton}>
            Okay
          </button>
        </div>
      ) : loading ? (
        <div className="loading-backdrop">
          <div className="loading-box">
            <div className="loading-spinner"></div>
            <div className="loading-text">Retrieving papers, this might take a moment...</div>
          </div>
        </div>
      ) : (
        <>
          <SearchNotes
           paperData={notesData}
            setSearchResults={setSearchResults}
             setIsModalOpen={setIsModalOpen}
             setCurrentPage={setCurrentPage}
              />

          <div className={classes.paperContainer} >
            {records.map((data, index) => (
              <div key={index} className={classes.paperCard}>
                <ImageUpload data={data} />
                <div className={classes.paperDetails}>
                  <NotesTabular data={data} approvedBy={true} />
                  <button onClick={() => viewHandler(data._id, navigate)} className={classes.Button}>View</button>
                  {role === "teacher" && (
                    <button style={{ background: "rgb(255, 165, 0)" }} className={classes.Button} onClick={()=>editNotesHandler(data._id,navigate)}>Edit</button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            numberOfPages={numberOfPages}
            numbers={numbers}
          />
        </>

      )}
    </>

  );
};

export default AllNotes;


