import MatchedCard from "./MatchedCard";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Checkbox,
  List,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import "../Components/line.css";
import EmployeeNavbar from "./EmployeeNavbar";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export default function MatchedJobs() {
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const navigate = useNavigate();
  const [salaryComponent, setSalary] = React.useState("");

  const [openModify, setOpenModify] = React.useState(false);
  const handleOpenModify = (job) => {
    setSelectedJob(job);
    setOpenModify(true);
  };

  const [selectedJob, setSelectedJob] = React.useState(null);

  function formatDate(date) {
    const diffInMilliseconds = Math.abs(new Date() - date);
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "Posted today";
    } else if (diffInDays === 1) {
      return "Posted yesterday";
    } else {
      return `Posted ${diffInDays} days ago`;
    }
  }

  const handleApply = async (jobPostingId) => {
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
      console.log("Successfully applied to job!");
      alert("You have successfully applied to this job!");
      setRefreshTrigger(!refreshTrigger);
      handleOpenModify(); // Close the dialog
      // window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error applying to job:", error);
      alert("Error applying to job. Please try again later.");
    }
  };

  const [openAccordions, setOpenAccordions] = React.useState({
    1: true,
    2: true,
    3: true, // Accordion with ID 1 will be open by default
  });

  // Function to toggle the state of an Accordion
  const handleAccordionToggle = (accordionId) => {
    setOpenAccordions((prevState) => ({
      ...prevState,
      [accordionId]: !prevState[accordionId], // Toggle the state of the specific Accordion
    }));
  };

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
                setSalary(jobDetails.salary);
                return {
                  ...job,
                  id: jobDetails.id,
                  jobTitle: jobDetails.jobTitle,
                  jobDescription: jobDetails.jobDescription,
                  salaryMax: jobDetails.salaryMax,
                  salaryMin: jobDetails.salaryMin,
                  salary: jobDetails.salary,
                  matchPercentage: job.matchPercentage,
                  level: jobDetails.level,
                  companyName: jobDetails.companyName,
                  jobDate: jobDetails.jobDate,
                };
              } catch (error) {
                console.error("Error fetching job details:", error);
              }
            })
          );
          setMatchedJobs(updatedMatchedJobs);
          setFilteredJobs(updatedMatchedJobs);
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

  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    // setShowToast(true);
    toast.success("You have successfully applied to this job posting.");
  };

  //------------------------FILTERS------------------------
  const [matchPercentageFilters, setMatchPercentageFilters] = useState([]);
  const [salaryEstimationFilters, setSalaryEstimationFilters] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleMatchPercentageFilterChange = (filterValue) => {
    // Check if the filterValue is already in the filters array
    const updatedFilters = matchPercentageFilters.includes(filterValue)
      ? matchPercentageFilters.filter((value) => value !== filterValue) // Remove the filter value if it's already selected
      : [...matchPercentageFilters, filterValue]; // Add the filter value if it's not selected
    // Update the state variable with the updated filters
    setMatchPercentageFilters(updatedFilters);
  };

  const handleSalaryEstimationFilterChange = (filterValue) => {
    // Check if the filterValue is already in the filters array
    const updatedFilters = salaryEstimationFilters.includes(filterValue)
      ? salaryEstimationFilters.filter((value) => value !== filterValue) // Remove the filter value if it's already selected
      : [...salaryEstimationFilters, filterValue]; // Add the filter value if it's not selected
    // Update the state variable with the updated filters
    setSalaryEstimationFilters(updatedFilters);
  };

  const filterJobs = () => {
    // if there is no filter show all the matched jobs and exit
    if (matchPercentageFilters.length == 0 && salaryEstimationFilters.length == 0) {
      setFilteredJobs(matchedJobs);
      return;
    }


    let filtered = matchedJobs; // to store all matchedJobs
    // let filteredJobsSet = new Set(); //to store filtred Jobs

    // Apply match percentage filter
    if (matchPercentageFilters.length > 0) {
      let filter1 = [];
      matchPercentageFilters.forEach(filter => {
        let [min, max] = filter.split("-");
        filtered.forEach( job => {
          if (job.matchPercentage >= min && job.matchPercentage <= max) 
            filter1.push(job);
        });
      });
      filtered = filter1;
    }

    // Apply salary estimation filter
    if (salaryEstimationFilters.length > 0) {
      if (filtered.length == 0){
        setFilteredJobs(filtered);
        return;
      }
      let filter2 = [];
      salaryEstimationFilters.forEach(filter => {
        let [min, max] = filter.split("-");
        filtered.forEach( job => {
          if(job.salaryMin == min && job.salaryMax == max)
            filter2.push(job);
        });
      });
      filtered = filter2;
    }


    setFilteredJobs(filtered);

  

  };

  useEffect(() => {
    filterJobs();
  }, [matchPercentageFilters, salaryEstimationFilters]);

  //-------------------------------------------------------

  return (
    <>
      <EmployeeNavbar selectedItem={0} />
      <div className="flex w-full">
        <div className="w-2/6">
          <div className=" w-full max-w-[24rem] p-4 border ">
            <div className="mb-2 p-4 flex place-content-center">
              <AdjustmentsHorizontalIcon className="h-7 w-7 mr-1 pt-1" />

              <Typography variant="h4" color="blue-gray">
                Filters
              </Typography>
            </div>
            <List>
              <Accordion
                open={openAccordions[3]}
                icon={<Icon id={3} open={openAccordions[3]} />}
              >
                <AccordionHeader
                  onClick={() => handleAccordionToggle(3)}
                  className="text-mantis-700 hover:text-mantis-600"
                >
                  AI Match Percentage
                </AccordionHeader>
                <AccordionBody className="flex flex-col">
                  <Checkbox
                    ripple={false}
                    defaultUnchecked
                    color="teal"
                    label="90% - 100%"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                    onChange={() => handleMatchPercentageFilterChange("90-100")} // Pass the filter value here
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="80% - 90%"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                    onChange={() => handleMatchPercentageFilterChange("80-90")} // Pass the filter value here
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="70% - 80%"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                    onChange={() => handleMatchPercentageFilterChange("70-80")} // Pass the filter value here
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="60% - 70%"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                    onChange={() => handleMatchPercentageFilterChange("60-70")} // Pass the filter value here
                  />
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openAccordions[2]}
                icon={<Icon id={2} open={openAccordions[2]} />}
              >
                <AccordionHeader
                  onClick={() => handleAccordionToggle(2)}
                  className="flex text-mantis-700 hover:text-mantis-600"
                >
                  <Typography variant="h5">AI Salary Estimation</Typography>
                </AccordionHeader>
                <AccordionBody className="flex flex-col">
                  <Checkbox
                    ripple={false}
                    defaultUnchecked
                    color="teal"
                    label="$30,000 - $50,000"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                    onChange={() =>
                      handleSalaryEstimationFilterChange("30000-50000")
                    } // Pass the filter value here
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="$50,000 - $70,000"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                    onChange={() =>
                      handleSalaryEstimationFilterChange("50000-70000")
                    } // Pass the filter value here
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="$70,000 - $90,000"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                    onChange={() =>
                      handleSalaryEstimationFilterChange("70000-90000")
                    } // Pass the filter value here
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="$90,000 - $120,000"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                    onChange={() =>
                      handleSalaryEstimationFilterChange("90000-120000")
                    } // Pass the filter value here
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="$120,000 - $150,000"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                    onChange={() =>
                      handleSalaryEstimationFilterChange("120000-150000")
                    } // Pass the filter value here
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="$150,000 - $200,000"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                    onChange={() =>
                      handleSalaryEstimationFilterChange("150000-200000")
                    } // Pass the filter value here
                  />
                </AccordionBody>
              </Accordion>
            </List>
          </div>
        </div>
        <div className="w-4/6 ">
          <div className="mt-4">
            Applied Filters : 
          </div>
          {filteredJobs
          .sort((a, b) => new Date(b.jobDate) - new Date(a.jobDate))
          .map((job) => (
            <div>
              <MatchedCard
                key={job.id}
                id={job.id}
                jobPosting={job.jobPosting}
                jobTitle={job.jobTitle}
                jobDescription={job.jobDescription}
                salary={"$" + job.salaryMin + " - $" + job.salaryMax}
                jobSalary={job.salary}
                matchingPercentage={job.matchPercentage + "%"}
                numberOfApplicants={job.numberOfApplicants}
                level={job.level}
                jobDate={job.jobDate}
                companyName={job.companyName}
                setRefreshTrigger={setRefreshTrigger}
                refreshTrigger={refreshTrigger}
                handleShowToast={handleShowToast}
              />

              <Toaster position="bottom-right" reverseOrder={false} />
            </div>
          ))}
        </div>
      </div>

      <div>
        {}
      </div>
    </>
  );
}
