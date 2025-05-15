import React, {useState } from "react";
import axios from "axios";
import "./Search.css";
import SearchNotesContainer from "./SearchContainer";


const SearchNotes = ({ paperData, setSearchResults, setIsModalOpen,setCurrentPage,searchResults,pendingPapers }) => {
  console.log(paperData)
  console.log(searchResults)
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    subject: "",
    department: "",
    year: "",
    semester: "",
    paper_type: "",
    exam_type: "",
  })

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value === "") {
      setSearchResults(paperData===pendingPapers?pendingPapers:paperData)
      console.log(searchResults)
      setCurrentPage(1)
    }
  };

  // useEffect(() => {
  //   handleSearch()
  // }, [filters])

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams()
      if (query.trim() !== "") {
        params.append("title", query)
      }
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          params.append(key, filters[key])
        }
      })

      const apiUrl = `${process.env.REACT_APP_APIURL}`
      const url = `${apiUrl}/papers/search_papers?${params.toString()}`
      const response = await axios.get(url);

      if (response.data.data.length > 0) {
        setSearchResults(response.data.data);
        setCurrentPage(1)
      } else {
        console.log(response.data.message)
        setSearchResults([]);
        setIsModalOpen(true)
        setCurrentPage(1)
      }
    } catch (error) {
      console.log(error)
      setSearchResults([]);
      setIsModalOpen(true)
      setCurrentPage(1)

    }
  };

  return (
    <>
      <SearchNotesContainer
        query={query}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        setFilters={setFilters}
        filters={filters}
      />
    </>
  );
};

export default SearchNotes;
