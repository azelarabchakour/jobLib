import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        try {
            await axios.post('http://localhost:8000/auth/users/reset_password_confirm/', { reset_code: resetCode, new_password: newPassword });
            setMessage('Password reset successfully');
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to reset password');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <label>Reset Code:</label>
                <input type="text" value={resetCode} onChange={(e) => setResetCode(e.target.value)} /> <br/>
                <label>New Password:</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /> <br/>
                <label>Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /> <br/>
                <button type="submit">Submit</button>
            </form>
            {error && <p>{error}</p>}
            <p>{message}</p>
        </div>
    );
};

export default ResetPassword;
