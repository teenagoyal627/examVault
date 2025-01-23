import React, {useEffect, useState } from 'react'
import './CommunityPaper/Search.css'
// import axios from 'axios';

const SearchContainer = ({query,handleInputChange,handleSearch}) => {
//     const [query, setQuery] = useState(""); 

//     const apiUrl = `${process.env.REACT_APP_APIURL}`

//   useEffect(() => {
//    fetchData()
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/all_paper`);
//       setPaperData(response.data || []);
//     } catch (error) {
//       console.error("Error fetching papers:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
//   };


//       const handleSearch = async () => {
//         if (query.trim() === ""){
//           fetchData()
//           return;
//         } 
//         try {
//           const response = await axios.get(`http://localhost:5000/papers/search_papers?title=${query}`);
//           console.log("response", response.data)
//           setPaperData(response.data.data || []);
//           console.log(response.data.data)
//         } catch (error) {
//           console.error("Error fetching search results:", error);
//         }
//       };
  
  return (
    
    <div className="search-container">
    <input
      type="text"
      placeholder="Search for papers..."
      value={query}
      onChange={handleInputChange}
      className="search-input"
    />
    <button onClick={handleSearch} className="search-button">
      Search
    </button>
  </div>

  )
}

export default SearchContainer
