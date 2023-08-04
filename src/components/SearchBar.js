import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

export default function SearchBar() {
  const [phrase, setPhrase] = useState(null);
  const navigate = useNavigate();

  const handleSearch = function (event) {
    event.preventDefault();

    navigate(`/search?q=${phrase}`);
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSearch}>
        {/* <label htmlFor="search">Search:</label> */}
        <input
          type="text"
          id="search"
          onChange={event => setPhrase(event.target.value)}
          placeholder="Search..."
          required
        />
        <button type="submit">Find</button>
      </form>
    </div>
  );
}
