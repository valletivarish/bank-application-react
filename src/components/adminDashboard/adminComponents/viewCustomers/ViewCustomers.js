import React, { useEffect, useState } from "react";
import { sanitizeData } from "../../../../utils/helpers/SanitizeData";
import { getAllCustomers as fetchAllCustomers } from "../../../../services/AdminServices";
import Table from "../../../../sharedComponents/Table/Table";
import { useNavigate } from "react-router-dom";
import "./ViewCustomers.css";
import ViewCustomersFilter from "../viewCustomers/ViewCustomersFilter";
import { verifyAdmin } from "../../../../services/AuthenticationServices";

const ViewCustomers = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState("asc");
  const [customers, setCustomers] = useState({});
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
        console.log(sanitizedData)
        setCustomers(sanitizedData);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, [page, size, sortBy, direction]);

  useEffect(() => {
    const checkAdmin = async () => {
      const response = await verifyAdmin(localStorage.getItem("authToken"));
      if (!response.data) {
        navigate('/');
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
            setSortBy={setSortBy}
            setDirection={setDirection}
            data={customers}
          />
          <Table
            data={customers}
            setPage={setPage}
            setSize={setSize}
            setDirection={setDirection}
            setSortBy={setSortBy}
          />
        </>
      )}
    </div>
  );
};

export default ViewCustomers;
