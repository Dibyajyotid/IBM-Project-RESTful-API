import React, { useState } from "react";
import "./css/SearchBar.css"; 

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `api/accomodations/search/getAccomodationBySearch?query=${query}&checkIn=${checkInDate}&checkOut=${checkOutDate}&adults=${adults}&children=${children}&pets=${pets}`
      );
      const data = await response.json();
      console.log("Search Results:", data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Where are you going?"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="dropdown">
          <button
            type="button"
            className="dropdown-button"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            Check-in / Check-out
          </button>
          {showDatePicker && (
            <div className="dropdown-menu">
              <label className="dropdown-label">Check-in</label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="dropdown-input"
              />
              <label className="dropdown-label">Check-out</label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="dropdown-input"
              />
            </div>
          )}
        </div>

        <div className="dropdown">
          <button
            type="button"
            className="dropdown-button"
            onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
          >
            {adults} Adults, {children} Children, {pets} Pets
          </button>
          {showGuestsDropdown && (
            <div className="dropdown-menu">
              <label className="dropdown-label">Adults:</label>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="dropdown-input"
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>

              <label className="dropdown-label">Children:</label>
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="dropdown-input"
              >
                {[...Array(5).keys()].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              <label className="dropdown-label">Pets:</label>
              <select
                value={pets}
                onChange={(e) => setPets(Number(e.target.value))}
                className="dropdown-input"
              >
                {[...Array(5).keys()].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <button type="submit" className="search-button">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
