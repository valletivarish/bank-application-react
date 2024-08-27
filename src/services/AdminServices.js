import axios from "axios";
import { AlreadyAssigned, InternalServerError, NotFoundError } from "../utils/error/ApiError";
export const getAllCustomers = async (page, size, sortBy, direction) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/bank/admin/customers`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
    const response = await axios.get(
      `http://localhost:8080/api/bank/admin/transactions`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
export const GetCustomerById = async(customerID) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/bank/admin/customers/${customerID}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
export const CreateCustomer = async (firstName, lastName, userId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/bank/admin/customers/${userId}`,
        {
          firstName: firstName,
          lastName: lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
  
  export const CreateAccount = async (bankId, customerId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/bank/admin/banks/${bankId}/customers/${customerId}/accounts`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
export const ActivateCustomer = async (customerID) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/bank/admin/customers/${customerID}/activate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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

export const GetUserById = async (userID) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/bank/admin/users/${userID}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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

export const DeactivateCustomer = async (customerID) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/bank/admin/customers/${customerID}/deactivate`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
