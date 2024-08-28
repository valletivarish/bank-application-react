import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../services/authenticationServices";
import "./Register.css";
import "react-toastify/dist/ReactToastify.css";
import { success, failure } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";
import validator from "validator";

const Register = () => {
  const navigate = useNavigate();
  const formRef = useRef();

  const handleRegistration = async (e) => {
    e.preventDefault();

    const name = formRef.current.querySelector("input[name='firstName']").value;
    const email = formRef.current.querySelector("input[name='email']").value;
    const password = formRef.current.querySelector(
      "input[name='password']"
    ).value;
    const admin = formRef.current.querySelector(
      "input[name='isAdmin']"
    ).checked;
    if(!validator.isAlpha(name)){
      failure("Invalid Name");
    }
    if(!validator.isEmail(email)){
      failure("Invalid Email");
      return;
    }
    if(!validator.isStrongPassword(password,{minLength:8,minUppercase:1,minLowercase:1,minSymbols:1})){
      alert(
        "Password should have \n1. minimum eight characters \n2. atleast one upper case letter\n3. atleast one lower case letter\n4. atleast one number\n5. atleast one special character"
      );
      return;
    }

    try {
      const response = await signup({ name, email, password, admin });
      if (response) {
        success("Registration completed Successfully");
        formRef.current.reset();
        setTimeout(() => {
          navigate("/");
        }, 8000);
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

  return (
    <div className="register-container">
      <form
        className="register-form"
        ref={formRef}
        onSubmit={handleRegistration}
      >
        <p className="register-form-title">Register your details</p>
        <div className="register-input-container">
          <input
            type="text"
            name="firstName"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="register-input-container">
          <input type="email" name="email" placeholder="Enter email" required />
        </div>
        <div className="register-input-container">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="register-checkbox-container">
          <input type="checkbox" name="isAdmin" />
          <label>Admin</label>
        </div>
        <button type="submit" className="register-submit">
          Register
        </button>
        <div className="register-link">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
