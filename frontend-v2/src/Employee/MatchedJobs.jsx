import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBarComponent1 from "./NavBarComponent1";
import MatchedCard from "./MatchedCard";
import FinalNavBar from "../Components/FinalNavbar";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Select,
  Checkbox,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  AdjustmentsHorizontalIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";



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

  const [openAccordions, setOpenAccordions] = React.useState({
    1: true,
    2:true,
    3:true, // Accordion with ID 1 will be open by default
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
                return {
                  ...job,
                  jobTitle: jobDetails.jobTitle,
                  jobDescription: jobDetails.jobDescription,
                  salaryMax: jobDetails.salaryMax,
                  salaryMin: jobDetails.salaryMin,
                  matchPercentage: job.matchPercentage,
                  level: jobDetails.level,
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
      <FinalNavBar />

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
                <AccordionHeader onClick={() => handleAccordionToggle(3)}>
                  AI Match Percentage
                </AccordionHeader>
                <AccordionBody className="flex flex-col">
                <Checkbox
                    ripple={false}
                    defaultUnchecked
                    color="teal"
                    label="90% - 100%"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="80% - 90%"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="70% - 80%"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="60% - 70%"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openAccordions[2]}
                icon={<Icon id={2} open={openAccordions[2]} />}
              >
                <AccordionHeader onClick={() => handleAccordionToggle(2)} className="flex">
                  <Typography variant="h5">
                  AI Salary Estimation
                  </Typography>
                 
                </AccordionHeader>
                <AccordionBody className="flex flex-col">
                <Checkbox
                    ripple={false}
                    defaultUnchecked
                    color="teal"
                    label="$30,000 - $50,000"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="$50,000 - $70,000"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="$70,000 - $90,000"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="$90,000 - $120,000"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="$120,000 - $150,000"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="$150,000 - $200,000"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openAccordions[1]}
                icon={<Icon id={1} open={openAccordions[1]} />}
              >
                <AccordionHeader onClick={() => handleAccordionToggle(1)}>
                  Experience Level
                </AccordionHeader>
                <AccordionBody className="flex flex-col">
                  <Checkbox
                    ripple={false}
                    defaultUnchecked
                    color="teal"
                    label="Junior Level"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="Intermediate Level"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="Senior Level"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="Expert Level"
                    className="h-5 w-5 border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                </AccordionBody>
              </Accordion>
              
              
            </List>
          </div>
        </div>
        <div className="w-4/6 ">
          {matchedJobs.map((job) => (
            <MatchedCard
              key={job.id}
              id={job.id}
              jobPosting={job.jobPosting}
              jobTitle={job.jobTitle}
              jobDescription={job.jobDescription}
              salary={"$" + job.salaryMin + " - $" + job.salaryMax}
              matchingPercentage={job.matchPercentage + "%"}
              numberOfApplicants={job.numberOfApplicants}
              level={job.level}
            />
          ))}
        </div>
      </div>
    </>
  );
};

