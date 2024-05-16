import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  Timeline,
} from "@material-tailwind/react";
import person from "../Assets/person.jpeg";
import { Rating } from "@material-tailwind/react";
import Footer from "../Components/Footer";
import SalaryCard from "../Components/SalaryCard";
import NavBarComponent1 from "../Components/NavBarComponent1";
import SalaryEstimation from "../Components/SalaryEstimation";
import NumberOfApplicants from "../Components/NumberOfApplicants";
import Level from "../Components/Level";
import JobDetailsComponent from "../Components/JobDetailsComponent";
import FinalNavBar from "../Components/FinalNavbar";
import EmployerNavbar from "./EmployerNavbar";
function setRating(score) {
  if (score > 90) return <Rating value={5} readonly ratedColor="blue" />;
  else if (score > 80) return <Rating value={4} readonly ratedColor="blue" />;
  else if (score > 70) return <Rating value={3} readonly ratedColor="yellow" />;
  else if (score > 60) return <Rating value={2} readonly ratedColor="blue" />;
  else if (score > 50) return <Rating value={1} readonly ratedColor="blue" />;
  else return <Rating value={0} readonly />;
}
function JobDetails() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { jobId } = useParams(); // Extract jobId from the URL

  // Function to fetch job details
  const fetchJobDetails = async () => {
    try {
      const authToken = localStorage.getItem("accessToken");

      if (!authToken) {
        setError("You need to login to access this page.");
        setLoading(false);
        return;
      }
      const response = await axios.get(
        `http://127.0.0.1:8000/employer/jobs/${jobId}/`,
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

  useEffect(() => {
    fetchJobDetails(); // Fetch job details on initial render
  }, [jobId]); // Re-fetch data whenever jobId changes

  const handleAcceptApplication = async (applicationId) => {
    try {
      const authToken = localStorage.getItem("accessToken");
      await axios.get(
        `http://127.0.0.1:8000/employer/applications/${applicationId}/accept/`,
        {
          headers: {
            Authorization: `JWT ${authToken}`,
          },
        }
      );
      // Refresh job details after accepting the application
      //console.log("Refreshing job details after accepting the application");
      fetchJobDetails();
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  const handleRefuseApplication = async (applicationId) => {
    try {
      const authToken = localStorage.getItem("accessToken");
      await axios.get(
        `http://127.0.0.1:8000/employer/applications/${applicationId}/refuse/`,
        {
          headers: {
            Authorization: `JWT ${authToken}`,
          },
        }
      );
      // Refresh job details after refusing the application
      fetchJobDetails();
    } catch (error) {
      console.error("Error refusing application:", error);
    }
  };

  const DownloadResume = async (applicationId) => {
    try {
      const authToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://127.0.0.1:8000/employee/getCv/${applicationId}`,
        {
          headers: {
            Authorization: `JWT ${authToken}`,
          },
          responseType: "blob", // Specify the response type as 'blob'
        }
      );

      // Create a blob URL for the PDF
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Create a link element and trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${applicationId}.pdf`);
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!job) {
    return <div>No job found</div>;
  }

  return (
    <>
      {/* <NavBarComponent1 /> */}
      <EmployerNavbar selectedItem={1} />
      <div className="card-old-job-descriptions mt-8">
        <div className="">
          <div>
            <Timeline>
              <div className="flex items-center justify-between pr-20 pl-20">
                <SalaryEstimation
                  salaryMin={job.salaryMin}
                  salaryMax={job.salaryMax}
                  jobStatus={job.jobStatus}
                ></SalaryEstimation>
                <Level
                  jobId={job.id}
                  jobStatus={job.jobStatus}
                  level={job.level}
                  jobTitle={job.jobTitle}
                  jobDescription={job.jobDescription}
                ></Level>
                <NumberOfApplicants
                  jobId={job.id}
                  numberOfApplicants={job.numberOfApplicants}
                  jobStatus={job.jobStatus}
                ></NumberOfApplicants>
              </div>
            </Timeline>
            <div className="pl-48">
              <JobDetailsComponent
                jobTitle={job.jobTitle}
                jobDescription={job.jobDescription}
                jobStatus={job.jobStatus}
              ></JobDetailsComponent>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default JobDetails;
