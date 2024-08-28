import React from "react";
import "./Table.css";
import CustomPagination from "../Pagination/CustomPagination";
import CustomDropodown from "../Dropdown/CustomDropdown";

const Table = (props) => {
  const { data, setSearchParams, searchParams } =
    props;
  const content = data.content;

  if (content && content.length > 0) {
    const tableHeaders = (
      <tr>
        {Object.keys(content[0]).map((key) => (
          <th>{key}</th>
        ))}
      </tr>
    );

    const tableData = content.map((d) => (
      <tr>
        {Object.keys(d).map((k) => (
          <td>{d[k]}</td>
        ))}
      </tr>
    ));

    return (
      <div className="table-container">
        <table className="table">
          <thead className="thead">{tableHeaders}</thead>
          <tbody>{tableData}</tbody>
        </table>
        <div className="pagination-section">
          <CustomDropodown
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            data={data}
            className="custom-dropdown"
          />
          <CustomPagination
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            data={data}
          />
        </div>
      </div>
    );
  }
};

export default Table;
