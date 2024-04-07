import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditUserInfo() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user info when component mounts
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('Access token not found');
            return;
        }

        const headers = {
            'Authorization': `JWT ${accessToken}`
        };

        axios.get('http://127.0.0.1:8000/auth/users/me/', { headers })
            .then(response => {
                setUsername(response.data.username);
                setEmail(response.data.email);
            })
            .catch(error => {
                // Handle errors
                setError(error);
            });
    }, []);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('Access token not found');
            return;
        }

        const headers = {
            'Authorization': `JWT ${accessToken}`,
            'Content-Type': 'application/json'
        };

        try {
                   // Update username
            await axios.post('http://127.0.0.1:8000/auth/users/set_username/', { new_username: username, current_password: password }, { headers });
            // Update email
            await axios.put('http://127.0.0.1:8000/auth/users/me/', { email }, { headers });
            // Update password
            await axios.post('http://127.0.0.1:8000/auth/users/set_password/', { current_password: password, new_password: newPassword }, { headers });

            // Redirect back to user info page
            navigate('/user-info');
        } catch (error) {
            // Handle errors
            setError(error);
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Edit User Info</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label>Current Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <label>New Password:</label>
                    <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditUserInfo;
