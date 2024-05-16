import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBarComponent1 from "./NavBarComponent1";
import ApplicationsCard from "./ApplicationsCard";
import { UnderlineTabs } from "./UnderlineTabs"; // Import the UnderlineTabs component

function Application() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("APPLIED"); // State variable to manage the active tab
  const [filteredJobs, setFilteredJobs] = useState([]); // State variable to store filtered jobs

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

  // Filter jobs based on the active tab
  useEffect(() => {
    if (activeTab === "APPLIED") {
      setFilteredJobs(
        jobs.filter((job) => job.applicationStatus === "APPLIED")
      );
    } else if (activeTab === "ACCEPTED") {
      setFilteredJobs(
        jobs.filter((job) => job.applicationStatus === "ACCEPTED")
      );
    } else if (activeTab === "REFUSED") {
      setFilteredJobs(
        jobs.filter((job) => job.applicationStatus === "REFUSED")
      );
    } else if (activeTab === "CANCELED") {
      setFilteredJobs(
        jobs.filter((job) => job.applicationStatus === "CANCELED")
      );
    }
  }, [jobs, activeTab]);

  return (
    <>
      <NavBarComponent1 />
      <UnderlineTabs setActiveTab={setActiveTab} />{" "}
      {/* Render the tabs component */}
      <center>
        {filteredJobs.map((job) => (
          <ApplicationsCard
            key={job.id}
            id={job.id}
            jobPosting={job.jobPosting}
            jobTitle={job.jobTitle}
            jobDescription={job.jobDescription}
            salary={job.salaryMin + "$ - " + job.salaryMax + "$"}
            matchingPercentage={job.matchPercentage + "%"}
            applicationStatus={job.applicationStatus}
          />
        ))}
      </center>
    </>
  );
}

export default Application;
