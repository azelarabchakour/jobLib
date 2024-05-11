import React, { useEffect, useState } from 'react';
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
} from "@material-tailwind/react";
import person from "../Assets/person.jpeg";
import "../Components/line.css";
import {
  ClockIcon,
  CommandLineIcon,
  CurrencyDollarIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";


export default function MatchedCard(props) {
  const navigate = useNavigate();


  const [openModify, setOpenModify] = React.useState(false);
  const handleOpenModify = () => setOpenModify(!openModify);
  const [refreshTrigger, setRefreshTrigger] = useState(false);


  // const [showToast, setShowToast] = useState(false);

  // useEffect(() => {
  //   if (showToast) {
  //     const timer = setTimeout(() => {
  //       setShowToast(false);
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [showToast]);
  // const handleShowToast = () => {
  //   setShowToast(true);
  // };

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
      // alert("You have successfully applied to this job!");
      props.setRefreshTrigger(!props.refreshTrigger);
      handleOpenModify(); // Close the dialog
      props.handleShowToast();
      // window.location.reload(); // Refresh the page

    } catch (error) {
      console.error("Error applying to job:", error);
      alert("Error applying to job. Please try again later.");
    }
  };

  return (
    <>
    <div>
      <Card
        className="mt-6 w-4/5 overflow-hidden"
        onClick={() => handleOpenModify()}
      >
        <CardBody>
          {/* <Typography variant="normal" color="blue-gray" className="mb-2">
            {props.date}
          </Typography> */}
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {props.jobTitle}
          </Typography>
          <div className="flex flex-row">
            <CommandLineIcon className="w-6 h-4 mt-1 text-mantis-600 " />
            <Typography className="font-bold text-mantis-600 ">
              {props.level} Level
            </Typography>
          </div>

          <Typography className="truncate-3-lines">
            {props.jobDescription}
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
                  {props.matchingPercentage}
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
                              {props.salary}
                            </Tooltip>

                            {props.jobSalary !== null && props.jobSalary !== 0 && (
                              <Tooltip
                                placement="right"
                                content="Job Salary"
                                className="border border-blue-gray-50 bg-white  shadow-xl shadow-black/10 text-black"
                                animate={{
                                  mount: { scale: 1, y: 0 },
                                  unmount: { scale: 0, y: 25 },
                                }}
                              >
                                <span>{"           $" + props.jobSalary}</span>
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
              onClick={() => handleOpenModify()}
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
      </Card>

      {/* Job details Dialog */}
      <Dialog size="lg" open={openModify} handler={handleOpenModify}>
        <DialogHeader>{props.jobTitle}</DialogHeader>
        <DialogBody>
          {/* <Typography variant="h5" color="blue-gray" className="mb-2">
          {props.jobTitle}
          </Typography> */}
          <div className="flex flex-row">
            <CommandLineIcon className="w-6 h-4 mt-1 text-mantis-600 " />
            <Typography className="font-bold text-mantis-600 ">
              {props.level} Level
            </Typography>
          </div>
          <div className="overflow-auto max-h-96">
            <Typography>{props.jobDescription}</Typography>
          </div>
        </DialogBody>
        <DialogFooter className="flex items-center justify-between">
          <div>
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
                  {props.matchingPercentage}
                </Typography>
              </Tooltip>
            </div>

            <div className="flex flex-row">
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
                              {props.salary}
                            </Tooltip>

                            {props.jobSalary !== null && props.jobSalary !== 0 && (
                              <Tooltip
                                placement="right"
                                content="Job Salary"
                                className="border border-blue-gray-50 bg-white  shadow-xl shadow-black/10 text-black"
                                animate={{
                                  mount: { scale: 1, y: 0 },
                                  unmount: { scale: 0, y: 25 },
                                }}
                              >
                                <span>{"           $" + props.jobSalary}</span>
                              </Tooltip>
                            )}
                          </div>
                        </pre>
                      </Typography>
            </div>
          </div>
          <div>
            <Button
              variant="text"
              color="red"
              className="mr-1"
              onClick={() => handleOpenModify()}
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={() => handleApply(props.jobPosting)}
            >
              <span>Apply</span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
      {/* {showToast && (
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
          <div class="ms-3 text-sm font-normal">Item moved successfully.</div>
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
      </div>)} */}
      </div>
    </>
  );
}
