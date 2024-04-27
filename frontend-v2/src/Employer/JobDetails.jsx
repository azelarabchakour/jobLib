import axios from "axios";
import JobApplication from "../Components/JobApplication";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";

export default function JobDetails() {
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { jobId } = useParams(); // Extract jobId from the URL

  const fetchJobDetails = async () => {
    try {
      const authToken = localStorage.getItem("accessToken");

      if (!authToken) {
        setError("You need to login to access this page.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `http://127.0.0.1:8000/employee/jobs/${jobId}/`,
        {
          headers: {
            Authorization: `JWT ${authToken}`,
          },
        }
      );
      setJob(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data: " + error.message);
      setLoading(false);
    }
  };


  return (
    <>
    {job.applications.map(application => (
      <JobApplication
        firstName = {application.employee.user.firstName}
        lastName = {application.employee.user.lastName}
      ></JobApplication>
  ))}
  </>
  );
}

