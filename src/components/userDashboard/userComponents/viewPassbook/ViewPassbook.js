import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Table from "../../../../sharedComponents/Table/Table";
import "./ViewPassbook.css";
import { sanitizeTransactionData } from "../../../../utils/helpers/SanitizeData";
import ViewPassbookFilter from "./viewPassbookComponents/ViewPassbookFilter";
import { fetchPassbook } from "../../../../services/CustomerServices";
import { verifyUser } from "../../../../services/AuthenticationServices";
const ViewPassbook = () => {
  const routeParams=useParams();
  const accountNumber=routeParams.accountNumber;
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [from, setFromDate] = useState();
  const [to, setToDate] = useState();
  const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState("asc");
  const [transactions, setTransactions] = useState([]);
  const [isUser,setIsUser]=useState();
  const getAllTransactions = async () => {
    
    try {
      const data = await fetchPassbook(
        from,
        to,
        page,
        size,
        sortBy,
        direction,
        accountNumber
      );
      if (data && data.content) {
        const sanitizedData = sanitizeTransactionData(data);
        setTransactions(sanitizedData);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, [page, size, sortBy, direction,from,to]);

  useEffect(() => {
    const checkUser = async () => {
      const response = await verifyUser(localStorage.getItem("authToken"));
      console.log("Response", response);
      if (!response.data) {
        navigate("/");
        return;
      } else {
        setIsUser(true);
      }
    };

    checkUser();
  }, [navigate]);
  return (
    <div className="view-transactions-container">
        {isUser && (<>
          <div>
            <button
              className="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
          </div>
          <div className="title">View Passbook</div>
          <ViewPassbookFilter
            dataList={transactions.content && transactions.content.length > 0 ? Object.keys(transactions.content[0]) : []}
            setFromDate={setFromDate}
            setToDate={setToDate}
            setSortBy={setSortBy}
            setDirection={setDirection}
          />
          <Table
            data={transactions}
            setPage={setPage}
            setSize={setSize}
            setDirection={setDirection}
            setSortBy={setSortBy}
          />
        </>)}
      
    </div>
  );
};

export default ViewPassbook;
