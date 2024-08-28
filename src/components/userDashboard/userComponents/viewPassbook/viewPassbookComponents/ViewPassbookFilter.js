import React, { useState, useEffect } from "react";
import "./ViewPassbookFilter.css";

const ViewPassbookFilter = (props) => {
  const { setSearchParams, searchParams } = props;

  const [from, setFrom] = useState(searchParams.get("from") || "");
  const [to, setTo] = useState(searchParams.get("to") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "Sort By");
  const [direction, setDirection] = useState(searchParams.get("direction") || "Direction");

  useEffect(() => {
    setFrom(searchParams.get("from") || "");
    setTo(searchParams.get("to") || "");
    setSortBy(searchParams.get("sortBy") || "Sort By");
    setDirection(searchParams.get("direction") || "Direction");
  }, [searchParams]);

  const options = props.dataList
    .filter(
      (key) =>
        key !== "senderAccount" &&
        key !== "receiverAccount" &&
        key !== "transactionType"
    )
    .map((key) => (
      <option key={key} value={key}>
        {key}
      </option>
    ));

  const search = () => {
    const currentParams = new URLSearchParams();
    
    if (direction !== "Direction") {
      currentParams.set("direction", direction);
    }
    if (sortBy !== "Sort By") {
      currentParams.set("sortBy", sortBy);
    }
    if (from !== "") {
      currentParams.set("from", from);
    }
    if (to !== "") {
      currentParams.set("to", to);
    }
    setSearchParams(currentParams);
  };

  const reset = () => {
    setFrom("");
    setTo("");
    setSortBy("Sort By");
    setDirection("Direction");
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="filter-wrapper">
      <div className="filter-container">
        <div className="filter-input">
          <label htmlFor="from">From Date</label>
          <input
            type="date"
            name="from"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="filter-input">
          <label htmlFor="to">To Date</label>
          <input
            type="date"
            name="to"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div className="filter-input">
          <label htmlFor="sortBy">Sort By</label>
          <select
            className="form-select"
            aria-label="Sort By"
            name="sortBy"
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Sort By" disabled>
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
            onChange={(e) => setDirection(e.target.value)}
          >
            <option value="Direction" disabled>
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

export default ViewPassbookFilter;
