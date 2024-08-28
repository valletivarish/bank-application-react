import axios from "axios";
import { AlreadyAssigned, InternalServerError, NotFoundError } from "../utils/error/ApiError";
export const getAllCustomers = async (page, size, sortBy, direction) => {
  try {
    const token=localStorage.getItem("authToken");
    if(!token){
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.get(
      `http://localhost:8080/api/bank/admin/customers`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: { page, size, sortBy, direction },
      }
    );
    return response.data;
  } catch (error) {
    if(error && error.response){
      const {status,message}=error.response.data;
      if(status===404){
        throw new NotFoundError(message);
      }
      throw new InternalServerError("Internal Server Error");
    }
  }
};
export const getAllTransactions = async (
  from,
  to,
  page,
  size,
  sortBy,
  direction
) => {
  try {
    const token=localStorage.getItem("authToken");
    if(!token){
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.get(
      `http://localhost:8080/api/bank/admin/transactions`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: { from, to, page, size, sortBy, direction },
      }
    );
    return response.data;
  } catch (error) {
    if(error && error.response){
      const {status,message}=error.response.data;
      if(status===404){
        throw new NotFoundError(message);
      }
      throw new InternalServerError("Internal Server Error");
    }
  }
};
export const getCustomerById = async(customerID) => {
  try {
    const token=localStorage.getItem("authToken");
    if(!token){
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.get(`http://localhost:8080/api/bank/admin/customers/${customerID}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          },
        }
        );
      return response
      }
    catch(error){
      if(error && error.response){
        const {status,message}=error.response.data;
        if(status===404){
          throw new NotFoundError(message);
        }
        throw new InternalServerError("Internal Server Error");
      }
    }
};
export const createCustomer = async (firstName, lastName, userId) => {
    try {
      const token=localStorage.getItem("authToken");
    if(!token){
      throw new Error("Authentication token not found. Please log in again.");
    }
      const response = await axios.post(
        `http://localhost:8080/api/bank/admin/customers/${userId}`,
        {
          firstName: firstName,
          lastName: lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      if(error && error.response){
        const {status,message}=error.response.data;
        if(status===404){
          throw new NotFoundError(message);
        }
        if(status===409){
          throw new AlreadyAssigned(message);
        }
        throw new InternalServerError("Internal Server Error");
      }
    }
  };
  
  export const createAccount = async (bankId, customerId) => {
    try {
      const token=localStorage.getItem("authToken");
    if(!token){
      throw new Error("Authentication token not found. Please log in again.");
    }
      const response = await axios.post(
        `http://localhost:8080/api/bank/admin/banks/${bankId}/customers/${customerId}/accounts`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      if(error && error.response){
        const {status,message}=error.response.data;
        if(status===404){
          throw new NotFoundError(message);
        }
        if(status===409){
          throw new AlreadyAssigned(message);
        }
        throw new InternalServerError("Internal Server Error");
      }
    }
  };
export const activateCustomer = async (customerID) => {
  try {
    const token=localStorage.getItem("authToken");
    if(!token){
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.put(
      `http://localhost:8080/api/bank/admin/customers/${customerID}/activate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if(error && error.response){
      const {status,message}=error.response.data;
      if(status===404){
        throw new NotFoundError(message);
      }
      if(status===409){
        throw new AlreadyAssigned(message);
      }
      throw new InternalServerError("Internal Server Error");
    }
  }
};

export const getUserById = async (userID) => {
  try {
    const token=localStorage.getItem("authToken");
    if(!token){
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.get(
      `http://localhost:8080/api/bank/admin/users/${userID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if(error && error.response){
      const {status,message}=error.response.data;
      if(status===404){
        throw new NotFoundError(message);
      }
      throw new InternalServerError("Internal Server Error");
    }
  }
};

export const deactivateCustomer = async (customerID) => {
  try {
    const token=localStorage.getItem("authToken");
    if(!token){
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.delete(
      `http://localhost:8080/api/bank/admin/customers/${customerID}/deactivate`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if(error && error.response){
      const {status,message}=error.response.data;
      if(status===404){
        throw new NotFoundError(message);
      }
      if(status===409){
        throw new AlreadyAssigned(message);
      }
      throw new InternalServerError("Internal Server Error");
    }
  }
};
