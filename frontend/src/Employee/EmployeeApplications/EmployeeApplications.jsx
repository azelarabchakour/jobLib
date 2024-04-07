import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeNavbar from '../EmployeeNavbar/EmployeeNavbar';

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

    axios.get('http://127.0.0.1:8000/employee/jobs/status/', {
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
      <EmployeeNavbar></EmployeeNavbar>
      <div className="card-old-job-descriptions">
      <h1>Jobs Applied</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {jobs.map(job => (
            <li key={job.id} className="job-card">
              <div className="job-card-content">
                <h2 className="job-title">Job ID: {job.id}</h2>
                <p className="job-description">Application Date: {job.application_date}</p>
                <p className="job-description">Application Status: {job.applicationStatus}</p>
              </div>
              <div className="job-actions">
                {/* Add your buttons here */}
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
