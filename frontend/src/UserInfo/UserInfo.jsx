import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserInfoStyle.css'

function UserInfo() {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

useEffect(() => {
    // Fetch user info when component mounts
    axios.get('http://127.0.0.1:8000/auth/users/me')
        .then(response => {
        // Set user info state
        setUserInfo(response.data);
        setLoading(false);
    })
    .catch(error => {
        // Handle errors
        setError(error);
        setLoading(false);
    });
}, []);

if (loading) {
    return <div>Loading...</div>;
}

if (error) {
    return <div>Error: {error.message}</div>;
}

return (
    <div className="user-info-container">
        <h2 className="user-info-title">User Info</h2>
        <div className="user-info-item">
        <strong  className="user-info-label">Username:</strong> 
        <span className="user-info-value">{userInfo.username}</span>
    </div>
    <div className="user-info-item">
        <strong className="user-info-label">Email:</strong>
        <span className="user-info-value">{userInfo.email} </span> 
    </div>
    </div>
);
}

export default UserInfo;
