import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Table from "../../../../sharedComponents/Table/Table";
import { verifyAdmin } from "../../../../services/authenticationServices";
import "./viewTransaction.css";
import { useSearchParams } from "react-router-dom";
import { sanitizeTransactionData } from "../../../../utils/helpers/SanitizeData";
import { getAllTransactions as fetchAllTransactions } from "../../../../services/adminServices";
import ViewTransactionFilter from "./ViewTransactionFilter";
const ViewTransaction = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const from=searchParams.get("from") || "";
  const to=searchParams.get("to") || "";
  const page=parseInt(searchParams.get("page")) || 0;
  const size=parseInt(searchParams.get("size")) || 5;
  const sortBy=searchParams.get("sortBy") || "id";
  const direction=searchParams.get("direction") || "asc";
  const [transactions, setTransactions] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const getAllTransactions = async () => {
    try {
      const data = await fetchAllTransactions(
        from,
        to,
        page,
        size,
        sortBy,
        direction
      );
      if (data && data.content) {
        const sanitizedData = sanitizeTransactionData(data);
        setTransactions(sanitizedData);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      const statusCode = error.statusCode || "Unknown";
      const errorMessage = error.message || "An error occurred";
      const errorType = error.errorType || "Error";
      navigate(`/error/${statusCode}`, {
        state: { status: statusCode, errorMessage, errorType },
      });
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, [searchParams]);

  useEffect(() => {
    const checkAdmin = async () => {
      const response = await verifyAdmin(localStorage.getItem("authToken"));
      if (!response.data) {
        navigate("/");
        return;
      } else {
        setIsAdmin(true);
      }
    };

    checkAdmin();
  }, [navigate]);
  return (
    <div className="view-transactions-container">
      {isAdmin && (
        <>
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
          <div className="title">View Transactions</div>
          <ViewTransactionFilter
            dataList={transactions.content && transactions.content.length > 0 ? Object.keys(transactions.content[0]) : []}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Table
            data={transactions}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </>
      )}
    </div>
  );
};

export default ViewTransaction;
