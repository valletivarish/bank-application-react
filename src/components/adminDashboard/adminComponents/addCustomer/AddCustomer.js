import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  createCustomer,
  getUserById,
} from "../../../../services/adminServices";
import "./AddCustomer.css";
import { useNavigate } from "react-router-dom";
import { verifyAdmin } from "../../../../services/authenticationServices";

const AddCustomer = () => {
  const { userId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading,setLoading]=useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const userEmail = await getUserById(userId);
          console.log(userEmail);
          setEmail(userEmail);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserData();
    }
  }, [userId]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const response = await verifyAdmin(localStorage.getItem("authToken"));
      console.log("Response",response)
      if (!response.data) {
        navigate('/');
        return;
      } else {
        setIsAdmin(true);
      }
    };

    checkAdmin();
  }, [navigate]);

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      await createCustomer(firstName, lastName, userId);
      localStorage.setItem(
        "successDetails",
        JSON.stringify({
          statusCode: 200,
          message: "Customer created successfully!",
        })
      );
      navigate("/success");
    } catch (error) {
      const statusCode = error.statusCode || "Unknown";
      const errorMessage = error.message || "An error occurred";
      const errorType = error.errorType || "Error";
      navigate(`/error/${statusCode}`, {
        state: { status: statusCode, errorMessage, errorType },
      });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-customer-container">
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
          <h1>Add Customer</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                readOnly
              />
            </div>
            <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Creating Customer..." : "Add Customer"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AddCustomer;
