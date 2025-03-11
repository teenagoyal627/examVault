import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Search.css";
import classes from '../MyPaper/MyPaper.module.css';
import { viewHandler } from "../MyPaper/MyPaperUtility";
import { useNavigate } from "react-router";
import SearchContainer from "./SearchContainer";
import ImageUpload from "../ImageUpload";
import PaperTabular from "../PaperTabular";
import FilterButton from "../FilterBox/FilterButton";


const Search = ({ paperData, setSearchResults, setIsModalOpen }) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    subject: "",
    department: "",
    year: "",
    semester: "",
    paper_type: "",
    exam_type: "",
  })
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value === "") {
      setSearchResults(paperData)
    }
  };

  useEffect(() => {
    handleSearch()
  }, [filters])

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
      } else {
        console.log(response.data.message)
        setSearchResults([]);
        setIsModalOpen(true)
      }
    } catch (error) {
      console.log(error)
      setSearchResults([]);
      setIsModalOpen(true)

    }
  };

  return (
    <>
     
      <SearchContainer
        query={query}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        setFilters={setFilters}
      />
    </>
  );
};

export default Search;
