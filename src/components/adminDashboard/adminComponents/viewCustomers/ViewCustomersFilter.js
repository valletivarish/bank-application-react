import React, { useState,useEffect } from "react";
import "./ViewCustomersFilter.css";

const ViewCustomersFilter = (props) => {
  const { data, setSearchParams, searchParams } = props;
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "Sort By");
  const [direction, setDirection] = useState(searchParams.get("direction") || "Direction");

  useEffect(() => {
    setSortBy(searchParams.get("sortBy") || "Sort By");
    setDirection(searchParams.get("direction") || "Direction");
  }, [searchParams]);
  let options = [];

  const keyMapping = {
    "Customer ID": "id",
    "First Name": "firstName",
    "Last Name": "lastName",
  };

  if (data && data.content) {
    const keys = Object.keys(data.content[0]);
    options = keys.map((key, index) => {
      if (key !== "Status" && key !== "Action" && key !== "Email") {
        return (
          <option key={index} value={keyMapping[key]}>
            {key}
          </option>
        );
      }
    });
  }
  const search = () => {
    const currentParams = Object.fromEntries(searchParams);
    if (sortBy && sortBy !== "Sort By") {
      currentParams.sortBy = sortBy;
    }
    if (direction && direction !== "Direction") {
      currentParams.direction = direction;
    }
    setSearchParams(currentParams);
  };

  const reset = () => {
    setSortBy("Sort By")
    setDirection("Direction")
    setSearchParams([]);
  };

  return (
    <div className="filter-wrapper">
      <div className="filter-container">
        <div className="filter-input">
          <label htmlFor="sortBy">Sort By</label>
          <select
            className="form-select"
            aria-label="Sort By"
            name="sortBy"
            id="sortBy"
            value={sortBy}
            onChange={(e)=>setSortBy(e.target.value)}
          >
            <option value="" disabled >
              Sort By
            </option>
            {options}
          </select>
        </div>
        <div className="filter-input">
          <label htmlFor="direction">Direction</label>
          <select
            className="form-select"
            aria-label="Direction"
            name="direction"
            id="direction"
            value={direction}
            onChange={(e)=>{
              setDirection(e.target.value)
            }}
          >
            <option value="" disabled>
              Direction
            </option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="filter-actions">
          <button type="button" className="search-btn" onClick={search}>
            Search
          </button>
          <button type="button" className="reset-btn" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomersFilter;
