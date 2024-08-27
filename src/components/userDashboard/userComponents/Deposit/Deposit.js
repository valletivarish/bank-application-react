import React, { useState, useEffect } from "react";
import {
  fetchAllAccounts,
  depositAmount,
} from "../../../../services/CustomerServices"; // Adjust the import path as needed
import { failure, success } from "../../../../utils/Toast";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Deposit.css";
import { verifyUser } from "../../../../services/AuthenticationServices";

const Deposit = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [isUser, setIsUser] = useState();
  const [loading,setLoading]=useState();
  const navigate = useNavigate();

  useEffect(() => {
    loadAccounts();
  }, []);
  const loadAccounts = async () => {
    try {
      const data = await fetchAllAccounts();
      setAccounts(data);
    } catch (error) {
      const statusCode = error.statusCode || "Unknown";
      const errorMessage = error.message || "An error occurred";
      const errorType = error.errorType || "Error";
      navigate(`/error/${statusCode}`, {
        state: { status: statusCode, errorMessage, errorType },
      });
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!selectedAccount || !amount) {
      failure("All fields are required.");
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      failure("Amount must be a positive number.");
      return;
    }

    try {
      await depositAmount(selectedAccount, amount);
      success("Deposit completed successfully!");
      setSelectedAccount("");
      setAmount("");
    } catch (error) {
      const statusCode = error.statusCode || "Unknown";
      const errorMessage = error.message || "An error occurred";
      const errorType = error.errorType || "Error";
      navigate(`/error/${statusCode}`, {
        state: { status: statusCode, errorMessage, errorType },
      });
    }
    finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    const checkUser = async () => {
      const response = await verifyUser(localStorage.getItem("authToken"));
      if (!response.data) {
        navigate("/");
      } else {
        setIsUser(true);
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <div className="deposit-container">
      {isUser && (
        <>
          <button
            className="button"
            onClick={() => {
              navigate(-1);
            }}
            style={{
              width: "60px",
            }}
          >
            Back
          </button>
          <h1>Deposit Funds</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="account">Account</label>
              <select
                id="account"
                className="form-control"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                required
              >
                <option value="">Select an account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.accountNumber}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Hang Tight, We're Processing Your Deposit..." : "Make Deposit"}
            </button>
          </form>
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default Deposit;
