import React, { useEffect, useState } from 'react';
import classes from '../../Papers/AllPapers/MyPaper/MyPaper.module.css';
import { editNotesHandler, viewHandler } from './Utility';
import { useNavigate, useSearchParams } from 'react-router';
import ImageUpload from '../../Papers/AllPapers/ImageUpload';
import axios from 'axios';
import '../../Papers/AllPapers/LoadingSpinner.css'
import Pagination from '../../Papers/AllPapers/Pagination/Pagination';
import { getAuth } from 'firebase/auth';
import NotesTabular from './NotesTabular';
import SearchNotes from '../Search/SearchNotes';


const AllNotes = () => {
  const [notesData, setNotesData] = useState([]);
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [role, setRole] = useState(null);
  const[searchParams,setSearchParams]=useSearchParams() 
  const[totalNotes,setTotalNotes]=useState(0)



    useEffect(()=>{
      const pageFromParams=parseInt(searchParams.get("page") || "1")
      setCurrentPage(pageFromParams)
    },[searchParams])
  

  const navigate = useNavigate()

  const apiUrl = `${process.env.REACT_APP_APIURL}`

// const apiUrl="http://localhost:5003"
  useEffect(() => {
    fetchData()
  }, [currentPage]);

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${apiUrl}/notes/all_notes`);
      setNotesData(response.data.data || []);
      setTotalNotes(response.data.total)
      setLoading(false)
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response?.data?.error || 'Something went wrong'}`);      } else {
      }      
      setLoading(true)
    }finally{
      setLoading(false)
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
  const records = searchResults && searchResults.length > 0 ? activeData.slice(firstIndex, lastIndex) : notesData
  const numberOfPages = searchResults && searchResults.length > 0 ? Math.ceil((activeData.length || 1) / recordsPerPage): Math.ceil(totalNotes/recordsPerPage)
  const numbers = [...Array(numberOfPages).keys()].map((n) => n + 1)


  return (
    <>

      {records.length !== 0 && !loading &&isModalOpen ? (
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
            <div className="loading-text">Retrieving notes, this might take a moment...</div>
          </div>
        </div>
      ) : (
        <>
          <SearchNotes
            notesData={notesData}
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

export default AllNotes;


