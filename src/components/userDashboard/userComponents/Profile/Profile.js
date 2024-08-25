import React, { useState, useEffect } from 'react';
import { getUserByEmail } from '../../../../services/CustomerServices';
import { success } from '../../../../utils/Toast'; 
import { ToastContainer } from 'react-toastify';
import './Profile.css';
import { FaEdit } from 'react-icons/fa'; 
import { updateUser } from '../../../../services/CustomerServices';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../../../../services/AuthenticationServices';

const Profile = () => {
  const navigate=useNavigate();
  const [user, setUser] = useState({});
  const[isUser,setIsUser]=useState();
  const [editableField, setEditableField] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserByEmail(localStorage.getItem("email"));
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = (field) => {
    setEditableField(field);
  };

  const handleChange = (e) => {
    setUser({ ...user, [editableField]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user.firstName,user.lastName,user.email);
      success("Profile updated successfully!");
      setEditableField(null); 
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
  useEffect(() => {
    const checkUser = async () => {
      const response = await verifyUser(localStorage.getItem("authToken"));
      console.log(response)
      if (!response.data) {
        navigate('/');
      } else {
        setIsUser(true);
      }
    };

    checkUser();
  }, [navigate]);
  return (
    <div className="profile-container">
      {isUser && (<>
        <button
              className="button"
              onClick={() => {
                navigate(-1);
              }}
              style={{width:"60px"}}
            >
              Back
            </button>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <div className="input-with-icon">
            <input
              type="text"
              id="firstName"
              className="form-control"
              value={user.firstName || ""}
              disabled={editableField !== "firstName"}
              onChange={handleChange}
            />
            <FaEdit 
              className="edit-icon" 
              onClick={() => handleEditClick("firstName")} 
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <div className="input-with-icon">
            <input
              type="text"
              id="lastName"
              className="form-control"
              value={user.lastName || ""}
              disabled={editableField !== "lastName"}
              onChange={handleChange}
            />
            <FaEdit 
              className="edit-icon" 
              onClick={() => handleEditClick("lastName")} 
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-with-icon">
            <input
              type="email"
              id="email"
              className="form-control"
              value={user.email || ""}
              disabled={editableField !== "email"}
              onChange={handleChange}
            />
            <FaEdit 
              className="edit-icon" 
              onClick={() => handleEditClick("email")} 
            />
          </div>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <ToastContainer />
      </>)}
    </div>
  );
};

export default Profile;
