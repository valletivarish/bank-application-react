import React, { useState, useEffect } from "react";
import "./PerformTransaction.css";
import {
  fetchAllAccounts,
  performTransaction,
} from "../../../../services/customerServices";
import { failure, success } from "../../../../utils/Toast";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../../../../services/authenticationServices";
import validator from "validator";

const PerformTransaction = () => {
  const [accounts, setAccounts] = useState([]);
  const [senderAccount, setSenderAccount] = useState("");
  const [receiverAccount, setReceiverAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [isUser, setIsUser] = useState();
  const [loading, setLoading] = useState(false);
  const [hasError,setHasError]=useState(false);
  const [message,setMessage]=useState();
  const navigate = useNavigate();
  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const data = await fetchAllAccounts();
        setAccounts(data);
      } catch (error) {
        // const statusCode = error.statusCode || "Unknown";
        const errorMessage = error.message || "An error occurred";
        // const errorType = error.errorType || "Error";
        // navigate(`/error/${statusCode}`, {
        //   state: { status: statusCode, errorMessage, errorType },
        // });
        setHasError(true);
        setMessage(errorMessage)
      }
    };

    loadAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!senderAccount || !receiverAccount || !amount) {
      failure("All fields are required.");
      return;
    }
    if(!validator.isEmpty(receiverAccount) && !validator.isNumeric(receiverAccount)){
      failure("Receiver Account Number should be numeric and not empty ");
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      failure("Amount must be a positive number.");
      return;
    }

    try {
      setLoading(true);
      await performTransaction(senderAccount, receiverAccount, amount);
      success("Transaction completed successfully!");
      setSenderAccount("");
      setReceiverAccount("");
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
    <div className="perform-transaction-container">
      {isUser && (
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
          <h1>Perform Transaction</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="senderAccount">Sender Account</label>
              <select
                id="senderAccount"
                className="form-control"
                value={senderAccount}
                disabled={hasError}
                onChange={(e) => setSenderAccount(e.target.value)}
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
              <label htmlFor="receiverAccount">Receiver Account</label>
              <input
                type="text"
                id="receiverAccount"
                className="form-control"
                value={receiverAccount}
                disabled={hasError}
                onChange={(e) => setReceiverAccount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                className="form-control"
                value={amount}
                disabled={hasError}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            {hasError && <p style={{color:"red",fontWeight:600,textAlign:"center"}}>{message}</p>}
            <button type="submit" className="submit-button" disabled={loading || hasError}>
              {loading ? "Processing Transfer..." : "Transfer Funds"}
            </button>
          </form>
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default PerformTransaction;