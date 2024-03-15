import React, { useState } from 'react';
import axios from 'axios';

const SigninForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/signin/', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            // Handle successful sign-in (e.g., redirect to profile page)
        } catch (error) {
            console.error('Signin failed:', error.response.data);
            // Handle signin error (e.g., display error message to user)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SigninForm;
