import NavBarComponent1 from "./NavBarComponent1";
import MatchedCard from "./MatchedCard";
import FinalNavBar from "../Components/FinalNavbar";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  Avatar,
  Textarea,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Alert,
  Input,
  Checkbox,
  List,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import person from "../Assets/person.jpeg";
import "../Components/line.css";
import {
  ClockIcon,
  CommandLineIcon,
  CurrencyDollarIcon,
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

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleShowToast = () => {
    setShowToast(true);
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
                <AccordionHeader
                  onClick={() => handleAccordionToggle(2)}
                  className="flex"
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
            <div>
              <MatchedCard
                key={job.id}
                id={job.id}
                jobPosting={job.jobPosting}
                jobTitle={job.jobTitle}
                jobDescription={job.jobDescription}
                salary={"$" + job.salaryMin + " - $" + job.salaryMax}
                jobSalary = {job.salary}
                matchingPercentage={job.matchPercentage + "%"}
                numberOfApplicants={job.numberOfApplicants}
                level={job.level}
                setRefreshTrigger={setRefreshTrigger}
                refreshTrigger={refreshTrigger}
                handleShowToast={handleShowToast}
              />

              {showToast && (
                <div
                  id="toast-bottom-right"
                  class="fixed flex items-center w-full max-w-xs p-4 space-x-4  divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg  right-5 bottom-5 space-x"
                  role="alert"
                >
                  <div
                    id="toast-success"
                    class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-mantis-100 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                    role="alert"
                  >
                    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                      <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <span class="sr-only">Check icon</span>
                    </div>
                    <div class="ms-3 text-sm font-normal">
                      You have successfully applied to this job posting.
                    </div>
                    <button
                      type="button"
                      class="ms-auto -mx-1.5 -my-1.5 bg-mantis-100 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                      data-dismiss-target="#toast-success"
                      aria-label="Close"
                    >
                      <span class="sr-only">Close</span>
                      <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* <div>
                <Card
                  className="mt-6 w-4/5 overflow-hidden"
                  onClick={() => handleOpenModify(job)}
                >
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {job.jobTitle}
                    </Typography>
                    <div className="flex flex-row">
                      <CommandLineIcon className="w-6 h-4 mt-1 text-mantis-600 " />
                      <Typography className="font-bold text-mantis-600 ">
                        {job.level} Level
                      </Typography>
                    </div>

                    <Typography className="truncate-3-lines">
                      {job.jobDescription}
                    </Typography>
                  </CardBody>
                  <CardFooter className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <SparklesIcon className="w-5 h-5 pt-1 mr-1 text-mantis-600" />
                        <Tooltip
                          placement="top"
                          content="AI Match Percentage"
                          className="border border-blue-gray-50 bg-white  shadow-xl shadow-black/10 text-black"
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                        >
                          <Typography className="text-mantis-600 font-bold">
                            {job.matchPercentage + "%"}
                          </Typography>
                        </Tooltip>
                      </div>

                      <Typography
                        variant="paragraph"
                        className="font-bold text-mantis-900"
                      >
                        <pre>
                          <div className="flex flex-row">
                            <SparklesIcon className="w-5 h-5 pt-1 mr-1 text-mantis-600" />
                            <Tooltip
                              placement="bottom"
                              content="AI Salary Estimation"
                              className="border border-blue-gray-50 bg-white  shadow-xl shadow-black/10 text-black"
                              animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                              }}
                            >
                              {"$" + job.salaryMin + " - $" + job.salaryMax}
                            </Tooltip>

                            {job.salary !== null && job.salary !== 0 && (
                              <Tooltip
                                placement="right"
                                content="Job Salary"
                                className="border border-blue-gray-50 bg-white  shadow-xl shadow-black/10 text-black"
                                animate={{
                                  mount: { scale: 1, y: 0 },
                                  unmount: { scale: 0, y: 25 },
                                }}
                              >
                                <span>{"           $" + job.salary}</span>
                              </Tooltip>
                            )}
                          </div>
                        </pre>
                      </Typography>
                    </div>
                    <div className="flex items-center -space-x-3">
                      <Button
                        variant="text"
                        className="flex items-center gap-2"
                        onClick={() => handleOpenModify(job)}
                      >
                        Show Details{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                          />
                        </svg>
                      </Button>
                    </div>
                  </CardFooter>
                </Card> */}

              {/* Job details Dialog */}
              {/* {selectedJob &&(
        
                <Dialog size="lg" open={openModify} handler={handleOpenModify}>
                  <DialogHeader>{selectedJob.jobTitle}</DialogHeader>
                  <DialogBody>
                    <div className="flex flex-row">
                      <CommandLineIcon className="w-6 h-4 mt-1 text-mantis-600 " />
                      <Typography className="font-bold text-mantis-600 ">
                        {selectedJob.level} Level
                      </Typography>
                    </div>
                    <div className="overflow-auto max-h-96">
                      <Typography>{selectedJob.jobDescription}</Typography>
                    </div>
                  </DialogBody>

                  <DialogFooter className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <SparklesIcon className="w-5 h-5 pt-1 mr-1 text-mantis-600" />
                        <Tooltip
                          placement="top"
                          content="AI Match Percentage"
                          className="border border-blue-gray-50 bg-white  shadow-xl shadow-black/10 text-black"
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                        >
                          <Typography className="text-mantis-600 font-bold">
                            {selectedJob.matchPercentage + "%"}
                          </Typography>
                        </Tooltip>
                      </div>

                      <Typography
                        variant="paragraph"
                        className="font-bold text-mantis-900"
                      >
                        <pre>
                          <div className="flex flex-row">
                            <SparklesIcon className="w-5 h-5 pt-1 mr-1 text-mantis-600" />
                            <Tooltip
                              placement="bottom"
                              content="AI Salary Estimation"
                              className="border border-blue-gray-50 bg-white  shadow-xl shadow-black/10 text-black"
                              animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                              }}
                            >
                              {"$" + selectedJob.salaryMin + " - $" + selectedJob.salaryMax}
                            </Tooltip>

                            {selectedJob.salary !== null && selectedJob.salary !== 0 && (
                              <Tooltip
                                placement="right"
                                content="Job Salary"
                                className="border border-blue-gray-50 bg-white  shadow-xl shadow-black/10 text-black"
                                animate={{
                                  mount: { scale: 1, y: 0 },
                                  unmount: { scale: 0, y: 25 },
                                }}
                              >
                                <span>{"              $" + selectedJob.salary}</span>
                              </Tooltip>
                            )}
                          </div>
                        </pre>
                      </Typography>
                    </div>
                    <div>
                      <Button
                        variant="text"
                        color="red"
                        className="mr-1"
                        // onClick={() => handleOpenModify()}
                      >
                        <span>Cancel</span>
                      </Button>
                      <Button
                        variant="gradient"
                        color="green"
                        // onClick={() => handleApply(selectedJob.jobPosting)}
                        onClick={() => console.log(selectedJob.jobPosting)}
                      >
                        <span>Apply</span>
                      </Button>
                    </div>
                  </DialogFooter>
                </Dialog>
                )}
                {showToast && (
                  <div
                    id="toast-bottom-right"
                    class="fixed flex items-center w-full max-w-xs p-4 space-x-4  divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg  right-5 bottom-5 space-x"
                    role="alert"
                  >
                    <div
                      id="toast-success"
                      class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                      role="alert"
                    >
                      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg
                          class="w-5 h-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span class="sr-only">Check icon</span>
                      </div>
                      <div class="ms-3 text-sm font-normal">
                        Item moved successfully.
                      </div>
                      <button
                        type="button"
                        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                        data-dismiss-target="#toast-success"
                        aria-label="Close"
                      >
                        <span class="sr-only">Close</span>
                        <svg
                          class="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
