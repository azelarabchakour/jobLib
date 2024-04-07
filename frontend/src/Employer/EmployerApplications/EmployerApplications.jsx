import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployerNavbar from '../EmployerNavbar/EmployerNavbar.jsx';
function ApplicationPage() {
const [jobs, setJobs] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

useEffect(() => {
    const authToken = localStorage.getItem('accessToken');
    if (!authToken) {
        setError("You need to login to access this page.");
        setLoading(false);
    return;
    }

    axios.get('#', {
    headers: {
        'Authorization': `JWT ${authToken}`
    }
    })
    .then(response => {
        setJobs(response.data);
        setLoading(false);
    })
    .catch(error => {
        setError('Error fetching data: ' + error.message);
        setLoading(false);
    });
}, []);

return (
    <>
    <EmployerNavbar/>
    <div className="card-old-job-descriptions">
    <h1>Jobs Applications</h1>
    {loading ? (
        <p>Loading...</p>
    ) : error ? (
        <p>{error}</p>
    ) : (
        <ul>
        {jobs.map(job => (
            <li key={job.id} className="job-card">
            
            <div className="job-actions">
                
            </div>
            </li>
        ))}
        </ul>
    )}
    </div>
    </>
);
}

export default ApplicationPage;
