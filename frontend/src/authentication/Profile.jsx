import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any stored authentication token or user data
        localStorage.removeItem('token'); // the token is stored in localStorage
        navigate('/login'); // Navigate to login page
    };

    return (
        <div>
            <h1>Welcome to your profile!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
