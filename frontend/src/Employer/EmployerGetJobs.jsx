import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './EmployerJobsStyle.css'; // Import your CSS file

function EmployerGetJobs() {
    const [oldJobDescriptions, setOldJobDescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        const authToken = localStorage.getItem('accessToken');
        if (!authToken) {
            setError("You need to login to access this page.");
            navigate('/login');
            setLoading(false);
        } else {
            axios.get('http://127.0.0.1:8000/employer/jobs/', {
                headers: {
                    'Authorization': `JWT ${authToken}`
                }
            })
            .then(response => {
                setOldJobDescriptions(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching old job descriptions:', error);
                setError('Error fetching old job descriptions. Please try again later.');
                setLoading(false);
            });
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a spinner component
    }

    if (error) {
        return (
            <div className="employer-error-message">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className='employer-body-container'>
            <div className="card-old-job-descriptions">
                <h2>Old Job Descriptions</h2>
                <ul>
                    {oldJobDescriptions.map(job => (
                        <li key={job.id} className="job-card">
                            <div className="job-card-content">
                                <h3 className="job-title">{job.jobTitle}</h3>
                                <p className="job-description">{job.jobDescription}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default EmployerGetJobs;
