import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EmployerNavbar from '../EmployerNavbar/EmployerNavbar.jsx';

function ApplicationPage() {
    const [job, setJob] = useState(null);
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

    useEffect(() => {
        fetchJobDetails(); // Fetch job details on initial render
    }, [jobId]); // Re-fetch data whenever jobId changes

    const handleAcceptApplication = async (applicationId) => {
        try {
            const authToken = localStorage.getItem('accessToken');
            await axios.get(`http://127.0.0.1:8000/employer/applications/${applicationId}/accept/`, {
                headers: {
                    'Authorization': `JWT ${authToken}`
                }
            });
            // Refresh job details after accepting the application
            fetchJobDetails();
        } catch (error) {
            console.error('Error accepting application:', error);
            // Handle error
        }
    };

    const handleRefuseApplication = async (applicationId) => {
        try {
            const authToken = localStorage.getItem('accessToken');
            await axios.get(`http://127.0.0.1:8000/employer/applications/${applicationId}/refuse/`, {
                headers: {
                    'Authorization': `JWT ${authToken}`
                }
            });
            // Refresh job details after refusing the application
            fetchJobDetails();
        } catch (error) {
            console.error('Error refusing application:', error);
            // Handle error
        }
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
                            <p>Candidate Name: {application.candidateName}</p>
                            <p>Application Status: {application.applicationStatus}</p>
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
