import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './EditJobStyle.css'; 

function EditJob() {
    const { jobId } = useParams(); // Get the jobId from the URL
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    useEffect(() => {
        // Get the JWT token from localStorage
        const accessToken = localStorage.getItem('accessToken');
    
        // Check if accessToken exists
        if (!accessToken) {
            console.error('Access token not found');
            // Handle not having access token, maybe redirect to login or display an error message
            return;
        }
    
        // Define the headers with Authorization token
        const headers = {
            'Authorization': `JWT ${accessToken}`
        };
        // Fetch the job details based on the jobId
        axios.get(`http://127.0.0.1:8000/employer/job/${jobId}/modifyJob/`)
            .then(response => {
                setJobTitle(response.data.jobTitle);
                setJobDescription(response.data.jobDescription);
            })
            .catch(error => {
                console.error('Error fetching job details:', error);
            });
    }, [jobId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
    
        // Send a PUT request to update the job details with authorization header
        axios.put(`http://127.0.0.1:8000/employer/job/${jobId}/modifyJob/`, {
            jobTitle: jobTitle,
            jobDescription: jobDescription
        }, {
            headers: {
                    'Authorization': `JWT ${accessToken}`
                }
        })
        .then(response => {
            console.log('Job updated successfully:', response.data);
            navigate('/employer/employer-old-jobs'); // Redirect to the old jobs page after successful update
        })
        .catch(error => {
            console.error('Error updating job:', error);
            // Handle error
        });
    };
    

    return (
        <div className="edit-job-container">
            <Link to="/employer/employer-old-jobs" className="back-link">Back to Jobs</Link>
            <h2 className="edit-job-heading">Edit Job</h2>
            <form onSubmit={handleSubmit}>
                <label className="job-title-label">
                    Job Title:
                    <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        required
                        className="job-title-input"
                    />
                </label>
                <br />
                <label className="job-description-label">
                    Job Description:
                    <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        required
                        className="job-description-textarea"
                    />
                </label>
                <br />
                <button type="submit" className="update-button">Update Job</button>
            </form>
        </div>
    );
}

export default EditJob;
