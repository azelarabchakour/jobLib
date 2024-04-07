import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EmployerNavbar from '../EmployerNavbar/EmployerNavbar.jsx';

function ApplicationPage() {
    const [job, setJob] = useState(null);
    const [matchedPercentage, setMatchedPercentage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { jobId } = useParams(); // Extract jobId from the URL

    // Function to fetch job details
    const fetchJobDetails = async () => {
        try {
            const authToken = localStorage.getItem('accessToken');

            if (!authToken) {
                setError("You need to login to access this page.");
                setLoading(false);
                return;
            }

            const response = await axios.get(`http://127.0.0.1:8000/employee/jobs/${jobId}/`, {
                headers: {
                    'Authorization': `JWT ${authToken}`
                }
            });
            setJob(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching data: ' + error.message);
            setLoading(false);
        }
    };

    // Function to fetch matched percentage for matched jobs
    const fetchMatchedPercentage = async () => {
        try {
            const authToken = localStorage.getItem('accessToken');
            const response = await axios.get(`http://127.0.0.1:8000/employee/matchedJobs/${jobId}/`, {
                headers: {
                    'Authorization': `JWT ${authToken}`
                }
            });
            setMatchedPercentage(response.data.matchPercentage);
        } catch (error) {
            console.error('Error fetching matched percentage:', error);
            // Handle error
        }
    };

    useEffect(() => {
        fetchJobDetails(); // Fetch job details on initial render
        fetchMatchedPercentage(); // Fetch matched percentage for matched jobs
    }, [jobId]); // Re-fetch data whenever jobId changes

    const handleAcceptApplication = async (applicationId) => {
        // Implementation for accepting application
    };

    const handleRefuseApplication = async (applicationId) => {
        // Implementation for refusing application
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!job) {
        return <div>No job found</div>;
    }

    return (
        <>
            <EmployerNavbar/>
            <div className="card-old-job-descriptions">
                <h1>Job Applications for {job.jobTitle}</h1> <br/>
                <ul>
                    {job.applications.map(application => (
                        <li key={application.id}>
                            <p>Application ID: {application.id}</p>
                            <p>Application Status: {application.applicationStatus}</p>
                            {matchedPercentage && <p>Match Percentage: {matchedPercentage}%</p>}
                            <button onClick={() => handleAcceptApplication(application.id)}>Accept</button>
                            <button onClick={() => handleRefuseApplication(application.id)}>Refuse</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ApplicationPage;
