import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmployerNavbar from "../EmployeeNavbar/EmployeeNavbar";
import "../../Employer/EmployerJobsStyle.css";

const MatchedJobs = () => {
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatchedJobsAndDetails = async () => {
      try {
        const authToken = localStorage.getItem("accessToken");
        if (!authToken) {
          setError("You need to login to access this page.");
          setLoading(false);
        } else {
          const response = await axios.get(
            "http://127.0.0.1:8000/employee/matchedJobs/",
            {
              headers: {
                Authorization: `JWT ${authToken}`,
              },
            }
          );
          const updatedMatchedJobs = await Promise.all(
            response.data.map(async (job) => {
              try {
                const jobDetailsResponse = await axios.get(
                  `http://127.0.0.1:8000/employee/jobs/${job.jobPosting}/`
                );
                const jobDetails = jobDetailsResponse.data;
                return {
                  ...job,
                  jobTitle: jobDetails.jobTitle,
                  jobDescription: jobDetails.jobDescription,
                  salaryMax: jobDetails.salaryMax,
                  salaryMin: jobDetails.salaryMin,
                  matchPercentage: job.matchPercentage, // Added match percentage
                };
              } catch (error) {
                console.error("Error fetching job details:", error);
              }
            })
          );
          setMatchedJobs(updatedMatchedJobs);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching matched job descriptions:", error);
        setError(
          "Error fetching matched job descriptions. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchMatchedJobsAndDetails();
  }, [refreshTrigger]);

  const handleApplyButtonClick = async (jobPostingId) => {
    try {
      const authToken = localStorage.getItem("accessToken");
      await axios.post(
        `http://127.0.0.1:8000/employee/jobs/${jobPostingId}/apply/`,
        {},
        {
          headers: {
            Authorization: `JWT ${authToken}`,
          },
        }
      );
      alert("You have successfully applied to this job!");
      setRefreshTrigger(!refreshTrigger);
    } catch (error) {
      console.error("Error applying to job:", error);
      alert("Error applying to job. Please try again later.");
    }
  };

  return (
    <>
      <EmployerNavbar />
      <div className="employer-body-container">
        <div className="card-old-job-descriptions">
          <h2>Your Matched Jobs!</h2> <br />
          <ul>
            {matchedJobs.map((job) => (
              <li key={job.id} className="job-card">
                <div className="job-card-content">
                  <h3 className="job-title">{job.jobTitle}</h3>
                  <p className="job-description">
                    {expandedJobId === job.id
                      ? job.jobDescription
                      : job.jobDescription}
                  </p>
                  <h3>
                    Salary Range: {job.salaryMin}-{job.salaryMax}
                  </h3>
                  <h3>Match Percentage: {job.matchPercentage}%</h3>{" "}
                  {/* Display match percentage */}
                  <div className="job-actions">
                    <button
                      className="apply-button"
                      onClick={() => handleApplyButtonClick(job.jobPosting)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MatchedJobs;
