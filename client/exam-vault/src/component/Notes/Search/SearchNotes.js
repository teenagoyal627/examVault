import React, {useEffect, useState } from "react";
import axios from "axios";
import "./Search.module.css";
import SearchNotesContainer from "./SearchContainer";
import { useSearchParams } from "react-router-dom";



const SearchNotes = ({ notesData, setSearchResults, setIsModalOpen,setCurrentPage }) => {
  const [query, setQuery] = useState("");
  const[searchParams,setSearchParams]=useSearchParams()
  const [filters, setFilters] = useState({
    subject: "",
    department: "",
    year: "",
    semester: "",
  })

  const handleInputChange = (e) => {
    const value=e.target.value
    setQuery(value);
    if (value === "") {
      setSearchResults(notesData)
      setCurrentPage(1)
    }
  };

  useEffect(()=>{
    const syncedFilters={
      subject:searchParams.get("subject") || "",
      department:searchParams.get("department") || "",
      year:searchParams.get("year") || "",
      semester:searchParams.get("semester") || "",
    }
    setFilters(syncedFilters)
    handleSearch()
  },[searchParams])

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams()
      if (query.trim() !== "") {
        params.append("title", query)
      }
      const filterKeys=['subject','department','year','semester']

      filterKeys.forEach(key=>{
        const val=searchParams.get(key)
        if(val) params.append(key,val)
      })

      const apiUrl = `${process.env.REACT_APP_APIURL}`
      const url = `${apiUrl}/notes/search_notes?${params.toString()}`
      const response = await axios.get(url);

      if (response.data.data.length > 0) {
        setSearchResults(response.data.data);
        setCurrentPage(1)
      } else {
        setSearchResults([]);
        setIsModalOpen(true)
        setCurrentPage(1)
      }
    } catch (error) {
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
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
    </>
  );
};

export default SearchNotes;
