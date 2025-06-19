import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Search.css";
import SearchContainer from "./SearchContainer";
import { useSearchParams } from "react-router-dom";


const Search = ({ paperData, setSearchResults, setIsModalOpen,setCurrentPage,searchResults,defaultParams={} }) => {
  console.log(searchResults)
  const [query, setQuery] = useState("");
  const[searchParams,setSearchParams]=useSearchParams()
  const [filters, setFilters] = useState({
    subject: "",
    department: "",
    year: "",
    semester: "",
    paper_type: "",
    exam_type: "",
  })

  const handleInputChange = (e) => {
    const value=e.target.value
    setQuery(value);
    if (value === "") {
      setSearchResults(paperData)
      setCurrentPage(1)
    }
  };


  useEffect(() => {
    const syncedFilters = {
      subject: searchParams.get("subject") || "",
      department: searchParams.get("department") || "",
      year: searchParams.get("year") || "",
      semester: searchParams.get("semester") || "",
      paper_type: searchParams.get("paper_type") || "",
      exam_type: searchParams.get("exam_type") || ""
    };
    setFilters(syncedFilters); 
    handleSearch();
  }, [searchParams]);


  const handleSearch = async () => {
    try {
      const params = new URLSearchParams()
  
    if(query.trim()!==""){
      params.append("title",query)
    }

      const filterKeys=['subject','department','year','semester','paper_type','exam_type']

    
      filterKeys.forEach(key => {
        const val = searchParams.get(key);
        if (val) params.append(key, val);
      });
      console.log(params)

      if(defaultParams.paper_approval_status){
        params.append("paper_approval_status",defaultParams.paper_approval_status)
      }
      const apiUrl = `${process.env.REACT_APP_APIURL}`
      const url = `${apiUrl}/papers/search_papers?${params.toString()}`
      console.log("url of the search request",url)
      const response = await axios.get(url);
        console.log("filtered data....",response.data.data)

      if (response.data.data.length > 0) {
        setSearchResults(response.data.data);
        setCurrentPage(1)
      } else {
        console.log(response.data.message)
        setSearchResults([]);
        // setIsModalOpen(true)
        setCurrentPage(1)
      }
    } catch (error) {
      console.log(error)
      setSearchResults([]);
      // setIsModalOpen(true)
      setCurrentPage(1)

    }
  };

  return (
    <>
      <SearchContainer
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

export default Search;
