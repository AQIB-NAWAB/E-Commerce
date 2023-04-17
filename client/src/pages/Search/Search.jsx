import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./search.css"
const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // Redirect to search results page
      navigate(`/products/${keyword}`);
    }else{
      navigate("/products")
    }
  };

  const handleSearchInputChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="animate search-container">
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Search for products..."
          value={keyword}
          onChange={handleSearchInputChange}
        />
        <button className="search-submit" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
