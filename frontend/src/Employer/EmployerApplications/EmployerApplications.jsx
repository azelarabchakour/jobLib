import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EmployerNavbar from '../EmployerNavbar/EmployerNavbar.jsx';

function ApplicationPage() {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { jobId } = useParams(); // Extract jobId from the URL

    useEffect(() => {
        const authToken = localStorage.getItem('accessToken');

        if (!authToken) {
            setError("You need to login to access this page.");
            setLoading(false);
            return;
        }

        axios.get(`http://127.0.0.1:8000/employee/jobs/${jobId}/`, {
            headers: {
                'Authorization': `JWT ${authToken}`
            }
        })
        .then(response => {
            setJob(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError('Error fetching data: ' + error.message);
            setLoading(false);
        });
    }, [jobId]); // Re-fetch data whenever jobId changes

    const handleAcceptApplication = async (applicationId) => {
        try {
            const authToken = localStorage.getItem('accessToken');
            await axios.get(`http://127.0.0.1:8000/employer/applications/${applicationId}/accept/`, {}, {
                headers: {
                    'Authorization': `JWT ${authToken}`
                }
            });
            // Assuming you want to update the UI after accepting the application, you might want to re-fetch job data here
            // You can call the useEffect hook again or make a separate function to fetch job details
            // Example:
            // setJob(null);
            // setLoading(true);
            // fetchJobDetails(); // Define fetchJobDetails function to fetch job details
        } catch (error) {
            console.error('Error accepting application:', error);
            // Handle error
        }
    };

    const handleRefuseApplication = async (applicationId) => {
        try {
            const authToken = localStorage.getItem('accessToken');
            await axios.get(`http://127.0.0.1:8000/employer/applications/${applicationId}/refuse/`, {}, {
                headers: {
                    'Authorization': `JWT ${authToken}`
                }
            });
            // Assuming you want to update the UI after refusing the application, you might want to re-fetch job data here
            // You can call the useEffect hook again or make a separate function to fetch job details
            // Example:
            // setJob(null);
            // setLoading(true);
            // fetchJobDetails(); // Define fetchJobDetails function to fetch job details
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
