import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [regUsername, setRegUsername] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regConfirmPassword, setRegConfirmPassword] = useState('');
    const [regError, setRegError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8000/auth/token/login/', {
            username: loginUsername,
            password: loginPassword,
        });

    // Login successful, store token
        localStorage.setItem('token', response.data.auth_token);
        console.log('Login successful:', response.data);
    // Optionally, redirect the user to another page
        window.location.href = '/profile'; // Redirect to profile page
    } catch (error) {
        console.error('Login failed:', error);
        setLoginError("Login failed. Please check your username and password.");
    }
};

    const handleRegistration = async (e) => {
        e.preventDefault();

    try {
    // Perform registration logic
        console.log('Registration successful!');
    // Optionally, redirect the user to another page
        window.location.href = '/index.html'; // Redirect to login page
    } catch (error) {
        console.error('Registration failed:', error);
        setRegError("Registration failed. Please try again later.");
    }
};

return (
<div>
    <h2>Login</h2>
    {regError && <p>{regError}</p>}
    <form onSubmit={handleRegistration}>
    <div>
        <label>Email:</label>
        <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
    </div>
        <div>
            <label>Password:</label>
            <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
    </form>
</div>
);
};

export default Login;
