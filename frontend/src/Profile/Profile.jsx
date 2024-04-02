import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './ProfileStyle.css'; // Assuming ProfileStyle.css is your stylesheet
import Logout from '../authentication/logout/logout.jsx';
import logo1 from '../public/Hr.png';
import logo2 from '../public/jobSeeker.jpeg';

const Profile = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleChoose = (page) => {
        navigate(page); // Navigate to the specified page
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Choose the user that suits you!</h1>
                <Logout className="logout-button" />
            </div>
            <div className="card-container">
                <div className='card'>
                    <h2>Job Seeker</h2>
                    <img src={logo1} alt='img1'/>
                    <button onClick={() => handleChoose('/job-seeker-page')}>Choose!</button>
                </div>
                <div className='card'>
                    <h2>Employer</h2>
                    <img src={logo2} alt='img2'/>
                    <button onClick={() => handleChoose('/employer-page')}>Choose!</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
