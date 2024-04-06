import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployerNavbar from '../EmployeeNavbar/EmployeeNavbar';

const MatchedJobs = () => {
    const [matchedJobDescriptions, setMatchedJobDescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const authToken = localStorage.getItem('accessToken');
        if (!authToken) {
            setError("You need to login to access this page.");
            setLoading(false);
        } else {
            axios.get('http://127.0.0.1:8000/employee/matchedJobs/', {
                headers: {
                    'Authorization': `JWT ${authToken}`
                }
            })
            .then(response => {
                setMatchedJobDescriptions(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching matched job descriptions:', error);
                setError('Error fetching matched job descriptions. Please try again later.');
                setLoading(false);
            });
        }
    }, []);


    return (
        <>
        <EmployerNavbar />
        <div className='employer-body-container'>
            <div className="card-old-job-descriptions">
                <h2>Your Matched Jobs!</h2> <br />
                <ul>
                    {matchedJobDescriptions.map(job => (
                        <li key={job.id} className="job-card">
                            <div className="job-card-content">
                                <h3 className="job-title">{job.jobTitle}</h3>
                                <p className="job-description">{job.jobDescription}</p>
                                <div className='job-actions'>
                                <button className="apply-button">Apply</button>
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
