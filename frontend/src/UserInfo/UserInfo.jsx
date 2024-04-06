import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserInfoStyle.css';

function UserInfo() {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Get the JWT token from localStorage
        const accessToken = localStorage.getItem('accessToken');

        // Check if accessToken exists
        if (!accessToken) {
            console.error('Access token not found');
            return;
        }

        // Define the headers with Authorization token
        const headers = {
            'Authorization': `JWT ${accessToken}`
        };

        // Fetch user info when component mounts with authorization header
        axios.get('http://127.0.0.1:8000/auth/users/me/', {
            headers: headers
        })
        .then(response => {
            // Set user info state
            setUserInfo(response.data);

        })
        .catch(error => {
            // Handle errors
            setError(error);
        });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
        <div className="user-info-container">
            <h2 className="user-info-title">User Info</h2>
            {userInfo && (
                <>
                    <div className="user-info-item">
                        <strong className="user-info-label">Username:</strong> 
                        <span className="user-info-value">{userInfo.username}</span>
                    </div>
                    <div className="user-info-item">
                        <strong className="user-info-label">Email:</strong>
                        <span className="user-info-value">{userInfo.email}</span> 
                    </div>
                </>
            )}
        </div>
        </>
    );
}

export default UserInfo;
