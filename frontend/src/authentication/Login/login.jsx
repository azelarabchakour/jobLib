import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginStyle.css';

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

            //navigate to the profile after successful login
            navigate('/switch-user');

            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Login failed:', error);
            setError("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div className='container-body-login'>
            <div className='login-container'>
            <img src={require('../../Assets/login2.png')} alt="login" className="login-image" />
            <form className='login-form' onSubmit={handleSubmit}>
                <h1 className='login-title'>Sign in to Joblib</h1>
                <h5>Don't have an account? <Link to='/signup'>Sign Up</Link> </h5> <br></br>
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
            </form>
        </div>
        </div>
        
    );
};

export default Login;
