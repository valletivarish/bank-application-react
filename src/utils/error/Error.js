import React, { useEffect, useState } from "react";
import './Errror.css'
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate=useNavigate();
  const navigateBack=()=>{
    navigate(-1);
  }
  const [errorDetails, setErrorDetails] = useState({});

  useEffect(() => {
    const storedErrorDetails = localStorage.getItem('errorDetails');
    if (storedErrorDetails) {
      setErrorDetails(JSON.parse(storedErrorDetails));
      localStorage.removeItem('errorDetails');
    }
  }, []);

  const { statusCode, errorType, message } = errorDetails;

  return (
    <div className="error-container">
      <h1>{statusCode || "Error"}</h1>
      <h2>{errorType || "Something went wrong"}</h2>
      <p>{message || "An unexpected error occurred."}</p>
      <button className="home-link" onClick={navigateBack}>Go back to Home</button>
    </div>
  );
};

export default Error;
