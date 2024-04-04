import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginStyle.css';
// import ResetPassword from '../ResetPassword/ForgetPassword.jsx'
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

            navigate('/profile');
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Login failed:', error);
            setError("Login failed. Please check your credentials and try again.");
        }
    };

    // const handleResetPassword = () => {
    //     navigate('/forget-password');
    // };

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
        <div className='container'>
            
            <img src={require('../../Assets/login2.png')} alt="login" className="login-image" />
            <form className='login-form' onSubmit={handleSubmit}>
            {/* <h5>Start your journey</h5> */}
            <h1 className='login-title'>Sign in to Joblib</h1>
            <h5>Don't have an account? <a href='/signup'>Sign Up</a> </h5> <br></br>
            {error && <p className='error-message'>{error}</p>}
                <div>
                    <label className='form-label'>Username</label>
                    <input className='form-input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label className='form-label'>Password</label>
                    <input className='form-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='login-button' type="submit">Login</button> <br></br>
                {/* <h6><a href='/forget-password' className="forgot-password-link">Forgot password?</a></h6> */}
            </form>
        </div>
    );
};

export default Login;
