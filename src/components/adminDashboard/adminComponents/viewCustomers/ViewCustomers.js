import React, { useEffect, useState } from "react";
import { sanitizeData } from "../../../../utils/helpers/SanitizeData";
import { getAllCustomers as fetchAllCustomers } from "../../../../services/adminServices";
import Table from "../../../../sharedComponents/Table/Table";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./ViewCustomers.css";
import ViewCustomersFilter from "../viewCustomers/ViewCustomersFilter";
import { verifyAdmin } from "../../../../services/authenticationServices";

const ViewCustomers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 0;
  const size = parseInt(searchParams.get("size")) || 5;
  const sortBy = searchParams.get("sortBy") || "id";
  const direction = searchParams.get("direction") || "asc";
  const [isAdmin, setIsAdmin] = useState(false);

  const getAllCustomers = async () => {
    try {
      const data = await fetchAllCustomers(page, size, sortBy, direction);
      if (data && data.content) {
        const sanitizedData = sanitizeData(
          data,
          ["customer_id", "firstName", "lastName", "email", "active"],
          setCustomers
        );
        setCustomers(sanitizedData);
      } else {
        setCustomers([]);
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
    getAllCustomers();
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
    <div className="view-customers-container">
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
          <div className="title">View Customers</div>
          <ViewCustomersFilter
            data={customers}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Table
            data={customers}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </>
      )}
    </div>
  );
};

export default ViewCustomers;
