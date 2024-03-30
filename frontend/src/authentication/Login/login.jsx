import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        const authToken = localStorage.getItem('token');
        if (authToken) {
            getUserDetails();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/auth/jwt/create/', {
                username,
                password,
            });

            const authToken = response.data.token;
            localStorage.setItem('token', authToken);
            console.log('Login successful:', response.data);

            axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

            // Redirect the user to another page upon successful login
            navigate('/profile'); // Redirect to '/profile' page

            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Login failed:', error);
            setError("Login failed. Please check your credentials and try again.");
        }
    };

    const getUserDetails = async () => {
        try {
            const authToken = localStorage.getItem('token');
            if (!authToken) {
                throw new Error('Authentication token not found');
            }

            const response = await axios.get('http://localhost:8000/auth/', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            console.log('User details:', response.data);
        } catch (error) {
            console.error('Failed to get user details:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
