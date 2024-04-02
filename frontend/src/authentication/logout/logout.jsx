import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any stored authentication token or user data
        localStorage.removeItem('token'); // the token is stored in localStorage
        navigate('/'); // Navigate to login page
    };

    
    return(
        <button onClick={handleLogout}>Logout</button>
    );

};

export default Logout;
