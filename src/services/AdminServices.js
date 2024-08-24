import axios from "axios";
import { AlreadyAssigned } from "../utils/error/ApiError";
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
    console.log(error);
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
    console.log(error);
  }
};
export const getByCustomerByID = () => {};
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
      if (error.response && error.response.data.status === 404) {
        throw new AlreadyAssigned(error.response.data.message);
      }
      throw error; 
    }
  };
  
export const CreateAccount = () => {};
export const ActivateAccount = () => {};
export const DeactivateAccount = () => {};
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
    console.error("Error activating customer:", error);
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
    console.log(error);
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
    console.error(
      "Error deactivating customer:",
      error.response ? error.response.data : error.message
    );
  }
};
