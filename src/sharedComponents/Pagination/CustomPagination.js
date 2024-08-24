import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";
import "./Pagination.css";

const CustomPagination = (props) => {
  const { setPage, data } = props;
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
            onClick={() => setPage(0)}
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
            onClick={() => setPage(page - 1)}
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
            onClick={() => setPage(i)}
          >
            {i + 1} {/* Displaying 1-based index */}
          </BootstrapPagination.Item>
        );
      }

      // Next Page
      if (page < totalPages - 1) {
        pages.push(
          <BootstrapPagination.Item
            key="next"
            className="pagination-control"
            onClick={() => setPage(page + 1)}
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
            onClick={() => setPage(totalPages - 1)}
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
