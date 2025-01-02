import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [filters, setFilters] = useState({
    title: "",
    date: "",
    paper_name: "",
    eca_type: "",
    paper_type: "",
  });

  const [results, setResults] = useState([]);

  // Handle input changes for each filter
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Fetch search results based on filters
  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString(); // Build query string
      const response = await axios.get(`http://localhost:5000/papers/search_papers?${queryParams}`);
      setResults(response.data.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Search by Title"
          value={filters.title}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Search by Date"
          value={filters.date}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="paper_name"
          placeholder="Search by Paper Name"
          value={filters.paper_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="eca_type"
          placeholder="Search by ECA Type"
          value={filters.eca_type}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="paper_type"
          placeholder="Search by Paper Type"
          value={filters.paper_type}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        {results.length > 0 ? (
          results.map((paper) => (
            <div key={paper._id}>
              <h3>{paper.title}</h3>
              <p>Paper Name: {paper.paper_name}</p>
              <p>ECA Type: {paper.eca_type}</p>
              <p>Paper Type: {paper.paper_type}</p>
              <p>Date: {new Date(paper.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
