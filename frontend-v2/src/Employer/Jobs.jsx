import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import JobPostingCard from "../Components/JobPostingCard";

export default function Jobs() {
  const [oldJobDescriptions, setOldJobDescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear any stored authentication token or user data
    localStorage.removeItem("accessToken"); // the token is stored in localStorage
    localStorage.removeItem("refreshToken");
    navigate("/"); // Navigate to login page
  };

  useEffect(() => {
    const authToken = localStorage.getItem("accessToken");
    if (!authToken) {
      setError("You need to login to access this page.");
      navigate("/login");
      setLoading(false);
    } else {
      axios
        .get("http://127.0.0.1:8000/employer/jobs/", {
          headers: {
            Authorization: `JWT ${authToken}`,
          },
        })
        .then((response) => {
          setOldJobDescriptions(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching old job descriptions:", error);
          setError(
            "Error fetching old job descriptions. Please try again later."
          );
          setLoading(false);
        });
    }
  }, []);

  const handleEdit = (jobId) => {
    // Redirect to the edit job page, passing the jobId as a parameter
    navigate(`/employer/edit-job/${jobId}/`);
  };

  const handleDelete = (jobId) => {
    // Send a DELETE request to the server to delete the job
    const authToken = localStorage.getItem("accessToken");
    axios
      .delete(`http://127.0.0.1:8000/employer/jobs/${jobId}/deleteJob/`, {
        headers: {
          Authorization: `JWT ${authToken}`,
        },
      })
      .then((response) => {
        // Remove the deleted job from the state
        setOldJobDescriptions(
          oldJobDescriptions.filter((job) => job.id !== jobId)
        );
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
        setError("Error deleting job. Please try again later.");
      });
  };

  const handleJobCardClick = (jobId) => {
    navigate(`/employer/${jobId}/applications`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="employer-error-message">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={handleLogout}>logout</Button>
      Hello world Employer
      {oldJobDescriptions.map((job) => (
        // <li key={job.id} className="job-card">
        //   <div
        //     className="job-application-card-content"
        //     onClick={() => handleJobCardClick(job.id)}
        //   >
        //     <h3 className="job-title">{job.jobTitle}</h3>
        //     <p className="job-description">{job.jobDescription}</p>
        //     <p className="job-salary">
        //       Salary: ${job.salaryMin} - ${job.salaryMax}
        //     </p>
        //   </div>
        //   <div className="job-actions">
        //     <button className="Edit" onClick={() => handleEdit(job.id)}>
        //       Edit
        //     </button>
        //     <button className="delete" onClick={() => handleDelete(job.id)}>
        //       Delete
        //     </button>
        //   </div>
        // </li>
        <JobPostingCard
          id={job.id}
          jobTitle={job.jobTitle}
          jobDescription={job.jobDescription}
          salary = {job.salaryMin + "$ - " + job.salaryMax + "$"} 
          numberOfApplicants={job.numberOfApplicants}
        ></JobPostingCard>
      ))}
    </div>
  );
}
