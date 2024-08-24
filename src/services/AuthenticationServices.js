import axios from "axios";
import { ValidationError } from "../utils/error/ApiError";
export const signin = async (email, password) => {
  try {
    const response = await axios
      .post(`http://localhost:8080/api/auth/signin`, {
        email: email,
        password: password,
      })
      .catch((error) => {
        console.log(error.response==="Bad Request")
        if (error.response) {
          throw new ValidationError(
            "Failed to sign in. Please check your credentials and try again."
          );
        }
      });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const signup = () => {};
export const verifyAdmin = () => {};
export const verifyUser = () => {};
