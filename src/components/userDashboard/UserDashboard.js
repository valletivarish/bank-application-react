import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserDashboard.css'; 
import ViewPassbookModal from './userComponents/viewPassbook/viewPassbookComponents/ViewPassbookModal';
import { verifyUser } from '../../services/authenticationServices';
import { useEffect } from 'react';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('');
    const [showPassbookModal, setShowPassbookModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [isUser,setIsUser]=useState(false);
    const routeParams = useParams();
    const navigate = useNavigate();
    const [userName,setUserName]=useState("User");

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleClosePassbookModal = () => setShowPassbookModal(false);
    const handleShowPassbookModal = () => setShowPassbookModal(true);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'getPassbook') {
            handleShowPassbookModal();
        } else {
            navigate(`/user-dashboard/${routeParams.userId}/${tab}`);
        }
    };
    useEffect(() => {
        const checkUser = async () => {
          const response = await verifyUser(localStorage.getItem("authToken"));
          if (!response.data) {
            navigate('/');
          } else {
            setIsUser(true);
          }
        };
    
        checkUser();
        setUserName(localStorage.getItem("fullName"));
      }, [navigate]);

    

    return (
        <div className="user-dashboard">
            {isUser && (
                <>
                <button className="user-button" onClick={handleLogout}>Logout</button>
            <h1>Welcome Back, {userName}!</h1>
            <div className="user-tabs">
                <button
                    className={`user-tab ${activeTab === 'deposit-amount' ? 'active' : ''}`}
                    onClick={() => handleTabClick('deposit-amount')}
                >
                    Deposit Amount
                </button>
                <button
                    className={`user-tab ${activeTab === 'perform-transaction' ? 'active' : ''}`}
                    onClick={() => handleTabClick('perform-transaction')}
                >
                    Perform Transaction
                </button>
                <button
                    className={`user-tab ${activeTab === 'getPassbook' ? 'active' : ''}`}
                    onClick={() => handleTabClick('getPassbook')}
                >
                    Get Passbook
                </button>
                <button
                    className={`user-tab ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => handleTabClick('profile')}
                >
                    Profile
                </button>
            </div>
            <ViewPassbookModal
                show={showPassbookModal}
                handleClose={handleClosePassbookModal}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
                </>
            )}
        </div>
    );
};

export default UserDashboard;
