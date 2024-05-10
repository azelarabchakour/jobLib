import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import JobPostingCard from "../Components/JobPostingCard";
import NavBarComponent1 from "../Components/NavBarComponent1";
import Footer from "../Components/Footer";
import TabsComponent from "../Components/TabsComponent";
import FinalNavBar from "../Components/FinalNavbar";
export default function Jobs() {
  const [oldJobDescriptions, setOldJobDescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeJobs, setActiveJobs] = useState([]);
  const [oldJobs, setOldJobs] = useState([]);


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
          setActiveJobs(response.data.filter(job => job.jobStatus === "POSTED"));
          setOldJobs(response.data.filter(job => job.jobStatus === "DONE"));
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
    navigate(`/employer/${jobId}/details`);
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
      {/* <NavBarComponent1 /> */}
      <FinalNavBar/>
      <center>
        <TabsComponent 
          oldJobs={oldJobs}
          activeJobs={activeJobs}
        ></TabsComponent>
      </center>
      {/* <Footer /> */}
    </div>
  );
}
