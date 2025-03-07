import React, { useState } from "react";
import axios from "axios";
import "./Search.css";
import classes from '../MyPaper/MyPaper.module.css';
import { viewHandler } from "../MyPaper/MyPaperUtility";
import { useNavigate } from "react-router";
import SearchContainer from "./SearchContainer";
import ImageUpload from "../ImageUpload";
import PaperTabular from "../PaperTabular";
import FilterButton from "../FilterBox/FilterButton";


const Search = () => {
  const [query, setQuery] = useState("");
  const[filters,setFilters]=useState({
      subject:"",
      year:"",
      semester:"",
      department:"",
      date: "",
      exam_type: "",
      paper_type: "",
    })
  const [paperData, setPaperData] = useState([]);
  const navigate = useNavigate()
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };


  const handleSearch = async () => {
    try {

      const params=new URLSearchParams()

      if (query.trim () !== "") {
        params.append("title",query)
      }

      Object.keys(filters).forEach((key)=>{
        if(filters[key]){
          params.append(key,filters[key])
        }
      })
      const response = await axios.get(`http://localhost:5000/papers/search_papers?${params.toString()}`);
      console.log("response", response.data)
      setPaperData(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("No search results found");
        setPaperData([]); 
      }    }
  };

  return (
    <>
      <SearchContainer 
      query={query}
       handleInputChange={handleInputChange} 
       handleSearch={handleSearch} 
       setFilters={setFilters}
       />
       {console.log(paperData.length)}
       {paperData.length ===0 &&(
        <p>no search results found</p>
       )}
      {query && paperData.length >0 && (
        <div className={classes.paperContainer} >
          {console.log("this is run ")}
          {paperData.map((data, index) => (
            <div key={index} className={classes.paperCard}>
              <ImageUpload data={data} />
              <div className={classes.paperDetails}>

                <PaperTabular data={data} approvedBy={true} />
                <button style={{ width: "100%" }} onClick={() => viewHandler(data._id, navigate)} className={classes.Button}>View</button>

              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
