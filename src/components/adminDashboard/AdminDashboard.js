import React, { useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import Modal from "../../utils/Modal/Modal";
import { GetUserById } from "../../services/AdminServices";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleAddCustomer = async () => {
    try {
      const response = await GetUserById(userId);
      if (response) {
        navigate(`/admin-dashboard/add-customer/${userId}`);
        handleCloseModal();
      } else {
        navigate('/error');
        handleCloseModal();
      }
    } catch {
      navigate('/error');
      handleCloseModal();
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "addCustomer") {
      handleShowModal();
    } else if (tab === "viewCustomers") {
      navigate("/admin-dashboard/view-customers");
    } else if (tab === "addBankAccount") {
      navigate("/admin-dashboard/add-account/:id");
    } else if (tab === "viewTransactions") {
      navigate("/admin-dashboard/view-transactions");
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Welcome to Admin Dashboard</h1>
      <div className="tabs">
        <button
          className={activeTab === "viewCustomers" ? "active" : ""}
          onClick={() => handleTabClick("viewCustomers")}
        >
          View Customers
        </button>
        <button
          className={activeTab === "addCustomer" ? "active" : ""}
          onClick={() => handleTabClick("addCustomer")}
        >
          Add Customer
        </button>
        <button
          className={activeTab === "addBankAccount" ? "active" : ""}
          onClick={() => handleTabClick("addBankAccount")}
        >
          Add Bank Account
        </button>
        <button
          className={activeTab === "viewTransactions" ? "active" : ""}
          onClick={() => handleTabClick("viewTransactions")}
        >
          View Transactions
        </button>
      </div>
      <Modal
        show={showModal}
        handleClose={handleCloseModal}
        handleAddCustomer={handleAddCustomer}
        userId={userId}
        setUserId={setUserId}
      />
    </div>
  );
};

export default AdminDashboard;
