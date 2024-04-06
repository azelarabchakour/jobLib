import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployerNavbar from '../EmployeeNavbar/EmployeeNavbar';
import '../../Employer/EmployerJobsStyle.css';

const MatchedJobs = () => {
    const [matchedJobs, setMatchedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMatchedJobsAndDetails = async () => {
            try {
                const authToken = localStorage.getItem('accessToken');
                if (!authToken) {
                    setError("You need to login to access this page.");
                    setLoading(false);
                } else {
                    const response = await axios.get('http://127.0.0.1:8000/employee/matchedJobs/', {
                        headers: {
                            'Authorization': `JWT ${authToken}`
                        }
                    });
                    console.log('Matched jobs:', response.data);
                    const updatedMatchedJobs = await Promise.all(
                        response.data.map(async job => {
                            try {
                                const jobDetailsResponse = await axios.get(`http://127.0.0.1:8000/employee/jobs/${job.jobPosting}/`);
                                const jobDetails = jobDetailsResponse.data;
                                return {
                                    ...job,
                                    jobTitle: jobDetails.jobTitle,
                                    jobDescription: jobDetails.jobDescription,
                                    salaryMax: jobDetails.salaryMax,
                                    salaryMin: jobDetails.salaryMin
                                };
                            } catch (error) {
                                console.error('Error fetching job details:', error);
                            }
                        })
                    );
                    console.log('Updated matched jobs:', updatedMatchedJobs);
                    setMatchedJobs(updatedMatchedJobs);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching matched job descriptions:', error);
                setError('Error fetching matched job descriptions. Please try again later.');
                setLoading(false);
            }
        };

        fetchMatchedJobsAndDetails();
    }, []);

    return (
        <>
            <EmployerNavbar />
            <div className='employer-body-container'>
                <div className="card-old-job-descriptions">
                    <h2>Your Matched Jobs!</h2> <br />
                    <ul>
                        {matchedJobs.map(job => (
                            <li key={job.id} className="job-card">
                                <div className="job-card-content">
                                    <h3 className="job-title">{job.jobTitle}</h3>
                                    <p className="job-description">{job.jobDescription}</p>
                                    <h3>Salary Range: {job.salaryMax}-{job.salaryMin}</h3>
                                    <div className='job-actions'>
                                        <button className="details-button">Details</button>
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

export default MatchedJobs;
