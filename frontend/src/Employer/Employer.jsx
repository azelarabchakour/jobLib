import React, { useState } from 'react';
import axios from 'axios';
import Logout from '../authentication/logout/logout';

function Employer() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new job posting object
    const newPost = {
      jobTitle: jobTitle,
      jobDescription: jobDescription
    };
    // Send a POST request to create the job posting
    axios.post('http://127.0.0.1:8000/employer/jobs/addJob/', newPost)
      .then(response => {
        // Reset form fields
        setJobTitle('');
        setJobDescription('');
        // Optionally, you can handle success response here
        console.log('Job posting created successfully:', response.data);
      })
      .catch(error => {
        console.error('Error creating job posting:', error);
      });
  };

  return (
    <div className="employer-container">
      <Logout className="logout-button" /> <br></br>
      <h2>Employer Component</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Job Title:
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Job Description:
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
  );
}

export default Employer;
