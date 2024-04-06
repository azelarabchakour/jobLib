import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import EmployerNavbar from './EmployerNavbar/EmployerNavbar';
import './EmployerJobsStyle.css';

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

    const handleEdit = (jobId) => {
        // Redirect to the edit job page, passing the jobId as a parameter
        navigate(`/employer/edit-job/${jobId}`);
    };

    const handleDelete = (jobId) => {
        // Send a DELETE request to the server to delete the job
        const authToken = localStorage.getItem('accessToken');
        axios.delete(`http://127.0.0.1:8000/employer/jobs/${jobId}/deleteJob/`, {
            headers: {
                'Authorization': `JWT ${authToken}`
            }
        })
        .then(response => {
            // Remove the deleted job from the state
            setOldJobDescriptions(oldJobDescriptions.filter(job => job.id !== jobId));
        })
        .catch(error => {
            console.error('Error deleting job:', error);
            setError('Error deleting job. Please try again later.');
        });
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div className="employer-error-message">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <>
        <EmployerNavbar />
        <div className='employer-body-container'>
            <div className="card-old-job-descriptions">
                <h2>Your Jobs!</h2> <br></br>
                <ul>
                    {oldJobDescriptions.map(job => (
                        <li key={job.id} className="job-card">
                            <div className="job-card-content">
                                <h3 className="job-title">{job.jobTitle}</h3>
                                <p className="job-description">{job.jobDescription}</p>
                                <div className="job-actions">
                                    <button className='Edit' onClick={() => handleEdit(job.id)}>Edit</button>
                                    <button className='delete' onClick={() => handleDelete(job.id)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    );
}

export default EmployerGetJobs;
 