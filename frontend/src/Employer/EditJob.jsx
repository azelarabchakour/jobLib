import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function EditJob() {
    const { jobId } = useParams(); // Get the jobId from the URL
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the job details based on the jobId
        axios.get(`http://127.0.0.1:8000/employer/jobs/${jobId}`)
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
        // Send a PUT request to update the job details
        axios.put(`http://127.0.0.1:8000/employer/jobs/${jobId}`, {
            jobTitle: jobTitle,
            jobDescription: jobDescription
        })
        .then(response => {
            console.log('Job updated successfully:', response.data);
            navigate('/employer-old-jobs'); // Redirect to the old jobs page after successful update
        })
        .catch(error => {
            console.error('Error updating job:', error);
            // Handle error
        });
    };

    return (
        <div>
            <h2>Edit Job</h2>
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
                <button type="submit">Update Job</button>
            </form>
        </div>
    );
}

export default EditJob;
