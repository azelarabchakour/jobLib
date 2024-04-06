import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logout from '../authentication/logout/logout';
import { Link, useNavigate } from 'react-router-dom';
import './EmployerStyle.css'

function EmployerPost() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const authToken = localStorage.getItem('accessToken');
    if (!authToken) {
      // If not authenticated
      setError("You need to login to access this page.");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new job posting object
    const newPost = {
      jobTitle: jobTitle,
      jobDescription: jobDescription
    };
    // Send a POST request to create the job posting
    axios.post('http://127.0.0.1:8000/employer/jobs/addJob/', newPost, {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('accessToken')}`
      }
    })
      .then(response => {
        // Reset form fields
        setJobTitle('');
        setJobDescription('');
        
        console.log('Job posting created successfully:', response.data);
        navigate('/employer-old-jobs');
      })
      .catch(error => {
        console.error('Error creating job posting:', error);
      });
  };

  if (error) {
    return (
      <div className="employer-error-message">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className='employer-body-container'>
      <Link to="/employer-old-jobs" className="employer-old-jobs-link">Check Your Jobs!</Link>
      <div className="employer-container">
        <h2>Post a job description!</h2>
        <form className='employer-post-form' onSubmit={handleSubmit}>
          <label>
            Job Title
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Job Description
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Post Job</button>
        </form>
      </div>
    </div>
  );
}

export default EmployerPost;
