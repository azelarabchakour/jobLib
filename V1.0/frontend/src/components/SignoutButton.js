import React from 'react';
import axios from 'axios';

const SignoutButton = () => {
    const handleSignout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/signout/');
            console.log(response.data);
            // Handle successful sign-out (e.g., redirect to login page)
        } catch (error) {
            console.error('Signout failed:', error.response.data);
            // Handle signout error (e.g., display error message to user)
        }
    };

    return (
        <button onClick={handleSignout}>Sign Out</button>
    );
};

export default SignoutButton;
