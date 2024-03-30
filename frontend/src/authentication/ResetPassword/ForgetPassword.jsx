import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/auth/users/reset_password/', { email });
            setMessage('Password reset code sent to your email');
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to send password reset code');
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                <button type="submit">Submit</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default ForgetPassword;
