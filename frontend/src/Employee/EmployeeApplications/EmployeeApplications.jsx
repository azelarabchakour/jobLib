import React, { useState, useEffect } from 'react';

function ApplicationPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/employee/jobs/status/')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Jobs Applied</h1>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            <h2>Job ID: {job.id}</h2>
            <p>Application Date: {job.application_date}</p>
            <p>Application Status: {job.applicationStatus}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicationPage;
