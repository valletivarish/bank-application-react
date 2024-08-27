import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";
import "./Pagination.css";

const CustomPagination = (props) => {
  const { data, setSearchParams, searchParams, setSearchCount, searchCount } =
    props;
  const { totalPages, page } = data;

  const renderPaginationItems = () => {
    const pages = [];
    
    if (totalPages > 0) {
      // First Page
      if (page > 0) {
        pages.push(
          <BootstrapPagination.Item
            key="first"
            className="pagination-control"
            onClick={() =>{
              const currentParams=Object.fromEntries(searchParams);
              currentParams.page=0;
              setSearchParams(currentParams);
              setSearchCount(searchCount-1);
            }}
          >
            &lt;&lt;&lt;
          </BootstrapPagination.Item>
        );
      }

      // Previous Page
      if (page > 0) {
        pages.push(
          <BootstrapPagination.Item
            key="prev"
            className="pagination-control"
            onClick={() => {
              const currentParams = Object.fromEntries(searchParams);
              currentParams.page = page - 1;
              setSearchParams(currentParams);
              setSearchCount(searchCount-1);
            }}
          >
            &lt;&lt;
          </BootstrapPagination.Item>
        );
      }

      // Page Numbers
      for (let i = 0; i < totalPages; i++) {
        pages.push(
          <BootstrapPagination.Item
            key={i}
            className={`pagination-item ${i === page ? "active" : ""}`}
            onClick={() => {
              const currentParams = Object.fromEntries(searchParams);
              currentParams.page = i;
              setSearchParams(currentParams);
              setSearchCount(searchCount-1);
            }}
          >
            {i + 1}
          </BootstrapPagination.Item>
        );
      }

      // Next Page
      if (page < totalPages - 1) {
        pages.push(
          <BootstrapPagination.Item
            key="next"
            className="pagination-control"
            onClick={() => {
              const currentParams = Object.fromEntries(searchParams);
              currentParams.page = page + 1;
              setSearchParams(currentParams);
              setSearchCount(searchCount-1);
            }}
          >
            &gt;&gt;
          </BootstrapPagination.Item>
        );
      }

      // Last Page
      if (totalPages > 0 && page < totalPages - 1) {
        pages.push(
          <BootstrapPagination.Item
            key="last"
            className="pagination-control"
            onClick={() => {
              const currentParams = Object.fromEntries(searchParams);
              currentParams.page = totalPages - 1;
              setSearchParams(currentParams);
              setSearchCount(searchCount-1);
            }}
          >
            &gt;&gt;&gt;
          </BootstrapPagination.Item>
        );
      }
    }

    return pages;
  };

  return (
    <div className="custom-pagination">
      <BootstrapPagination className="pagination">
        {renderPaginationItems()}
      </BootstrapPagination>
    </div>
  );
};

export default CustomPagination;
