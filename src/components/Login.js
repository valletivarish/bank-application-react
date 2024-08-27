import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../services/AuthenticationServices";
import "./Login.css";
import { useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserByEmail } from "../services/CustomerServices";
import {
  ValidationError,
  NotFoundError,
  UnAuthorized,
} from "../utils/error/ApiError";
import { failure } from "../utils/Toast";

const Login = () => {
  const navigate = useNavigate();
  const formRef = useRef();

  const redirection = async (e) => {
    e.preventDefault();

    const email = formRef.current.querySelector("input[type='email']").value;
    const password = formRef.current.querySelector(
      "input[type='password']"
    ).value;

    try {
      const response = await signin(email, password);

      const token = response.headers["authorization"];
      if (token) {
        localStorage.setItem("authToken", token);
      }

      if (response && response.data) {
        const roles = response.data.roles;
        if (roles.includes("ROLE_ADMIN")) {
          navigate("/admin-dashboard");
        } else {
          const user = await getUserByEmail(response.data.email);
          const id = user.userId;
          localStorage.setItem("fullName", user.userName);
          localStorage.setItem("id", id);
          localStorage.setItem("email", user.email);
          navigate(`/user-dashboard/${id}`);
        }
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
    <div className="container">
      <form className="form" ref={formRef}>
        <p className="form-title">
          Welcome to Spring bank Application
          <br />
          Login to your account
        </p>
        <div className="input-container">
          <input type="email" placeholder="Enter email" required />
        </div>
        <div className="input-container">
          <input type="password" placeholder="Enter password" required />
        </div>
        <div className="register-link">
          New user? <Link to="/register">Create an Account</Link>
        </div>
        <button type="submit" className="submit" onClick={redirection}>
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
