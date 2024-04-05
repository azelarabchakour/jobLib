import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginStyle.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Import and use useNavigate hook

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/auth/jwt/create/', {
                username,
                password
            });
            
            // the response contains tokens
            const { access, refresh } = response.data;
            // Storing tokens in local storage
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);

            // Redirect to profile page upon successful login
            navigate('/profile');
            console.log('Logged in successfully!');
        } catch (error) {
            setError('Invalid username or password');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className='container-body-login'>
            <div className='login-container'>
                <img src={require('../../Assets/login2.png')} alt="login" className="login-image" />
                <form className='login-form' onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}>
                    <h1 className='login-title'>Sign in to Joblib</h1>
                    <h5>Don't have an account? <Link to='/signup'>Sign Up</Link> </h5>
                    {error && <p className='error-message'>{error}</p>}
                    <div>
                        <label className='form-label'>Username</label>
                        <input className='form-input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label className='form-label'>Password</label>
                        <input className='form-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className='login-button' type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
