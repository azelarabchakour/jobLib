import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            // navigate to the profile if accessToken is already present
                // navigate('/profile');
        }
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/auth/jwt/create/', {
                username,
                password
            });

            const { access, refresh } = response.data;

            // Storing access token and refresh token in local storage
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);

            // Setting axios default headers with access token
            axios.defaults.headers.common['Authorization'] = `JWT ${access}`;

            console.log('Login successful:', response.data);

            
            navigate('/employer/employer-post');

            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Login failed:', error);
            setError("Login failed. Please check your credentials and try again.");
        }
    };

    return (
       
        <div>
            test
        </div>
    );
};

export default Login;