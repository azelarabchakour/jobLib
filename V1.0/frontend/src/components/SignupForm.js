import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password1: '',
        password2: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/signup/', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            // Handle successful sign-up (e.g., redirect to profile page)
        } catch (error) {
            console.error('Signup failed:', error.response.data);
            // Handle signup error (e.g., display error message to user)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="password" name="password1" placeholder="Password" value={formData.password1} onChange={handleChange} />
            <input type="password" name="password2" placeholder="Confirm Password" value={formData.password2} onChange={handleChange} />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignupForm;
