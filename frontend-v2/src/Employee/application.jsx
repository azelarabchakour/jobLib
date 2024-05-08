import React, { useState, useEffect } from "react";
import axios from "axios";

function ApplicationPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("accessToken");
    if (!authToken) {
      setError("You need to login to access this page.");
      setLoading(false);
      return;
    }

    axios
      .get("http://127.0.0.1:8000/employee/jobs/status/", {
        headers: {
          Authorization: `JWT ${authToken}`,
        },
      })
      .then((response) => {
        const updatedJobs = response.data.map((job) => ({
          ...job,
          jobTitle: job.job_posting.jobTitle,
          jobDescription: job.job_posting.jobDescription,
          applicationDate: job.application_date,
          applicationStatus: job.applicationStatus,
          employer: job.job_posting.employer.user.username,
          salaryMin: job.job_posting.salaryMin,
          salaryMax: job.job_posting.salaryMax,
          matchPercentage: job.matchPercentage,
        }));
        setJobs(updatedJobs);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data: " + error.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="card-old-job-descriptions">
        <h1>Jobs Applied</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {jobs.map((job) => (
              <li key={job.id} className="job-card">
                <div className="job-card-content">
                  <h2 className="job-title">{job.jobTitle}</h2>
                  <p className="job-description">{job.jobDescription}</p>
                  <p className="job-description">
                    Application Date: {job.applicationDate}
                  </p>
                  <p className="job-description">
                    Application Status: {job.applicationStatus}
                  </p>
                  <p className="job-description">Employer: {job.employer}</p>
                  <p className="job-description">
                    Salary Range: {job.salaryMin} - {job.salaryMax}
                  </p>
                  <p className="job-description">
                    Match Percentage: {job.matchPercentage}%
                  </p>
                </div>
                <div className="job-actions">{/* Add your buttons here */}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default ApplicationPage;
