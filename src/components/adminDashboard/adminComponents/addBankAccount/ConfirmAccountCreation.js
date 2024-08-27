import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ConfirmAccountCreation.css';
import { success, failure } from '../../../../utils/Toast';
import { CreateAccount } from '../../../../services/AdminServices';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

const ConfirmAccountCreation = () => {
  const navigate = useNavigate();
  const params = useParams();
  const bankId=params.bankId;
  const customerId=params.customerId
  const [loading,setLoading]=useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const response = await CreateAccount(bankId, customerId);
      console.log(response);
      if (response) {
        success("Account Created Successfully");
        setTimeout(()=>{
          navigate('/admin-dashboard');
        },8000)
      } else {
        failure("Failed to Create Account");
      }
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

  const handleCancel = () => {
    navigate('/admin-dashboard'); 
  };

  return (
    <div className="confirmation-container">
      <h2>Confirm Account Creation</h2>
      <p>Please review the details below and confirm the account creation.</p>
      <div className="confirmation-details">
        <p><strong>Bank ID:</strong> {bankId}</p>
        <p><strong>Customer ID:</strong> {customerId}</p>
      </div>
      <div className="confirmation-actions">
        <button className="btn btn-primary" onClick={handleConfirm} disabled={loading}>
        {loading ? "Confirming Account..." : "Confirm Account Creation"}
        </button>
        <button className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ConfirmAccountCreation;
