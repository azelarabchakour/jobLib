import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import JobApplication from '../Components/JobApplication';
import { Spinner } from "@material-tailwind/react";

function JobPostingDetails() {
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

    
    

    if (loading) {
        return <Spinner className="h-16 w-16 text-gray-900/50" />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!job) {
        return <div>No job found</div>;
    }

    return (
        <>
            <div className="card-old-job-descriptions">
                <h1>Job Applications for {job.jobTitle}</h1> <br/>
                    {job.applications.map(application => (
                        // <li key={application.id}>
                        //     <p>Application ID: {application.id}</p>
                        //     <p>Candidate Name: {application.employee.user.username}</p>
                        //     <p>Contact info: {application.employee.user.email}</p>
                        //     <p>Application Status: {application.applicationStatus}</p>
                        //     <button onClick={() => handleAcceptApplication(application.id)}>Accept</button>
                        //     <button onClick={() => handleRefuseApplication(application.id)}>Refuse</button>
                        //     <button onClick={() => DownloadResume(application.id)}>Download Cv</button>
                        // </li>
                        <JobApplication
                            jobId = {application.job.id}
                            id = {application.id}
                            firstName = {application.employee.user.first_name}
                            lastName = {application.employee.user.last_name}
                            date = {application.application_date}
                            matchPercentage = {application.matchPercentage}
                        ></JobApplication>
                    ))}
            </div>

        </>
    );
}

export default JobPostingDetails;
