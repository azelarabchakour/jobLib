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
} from "@material-tailwind/react";
import person from "../Assets/person.jpeg";
import "../Components/line.css";
import {
  BuildingOfficeIcon,
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

  function parseDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed in Date object
  }

  // Function to format the date
  function formatDate(dateString) {
    const date = parseDate(dateString);
    const currentDate = new Date();
    const diffInMilliseconds = Math.abs(currentDate - date);
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.abs(currentDate.getMonth() - date.getMonth());
    const diffInYears = Math.abs(
      currentDate.getFullYear() - date.getFullYear()
    );

    if (diffInDays === 0) {
      return "Posted today";
    } else if (diffInDays === 1) {
      return "Posted yesterday";
    } else if (diffInDays < 7) {
      return `Posted ${diffInDays} days ago`;
    } else if (diffInWeeks === 1) {
      return "Posted last week";
    } else if (diffInWeeks > 1 && diffInWeeks < 4) {
      return `Posted ${diffInWeeks} weeks ago`;
    } else if (diffInMonths === 1) {
      return "Posted last month";
    } else if (diffInMonths > 1 && diffInMonths < 12) {
      return `Posted ${diffInMonths} months ago`;
    } else if (diffInYears === 1) {
      return "Posted last year";
    } else {
      return `Posted ${diffInYears} years ago`;
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
            <div className="flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-4 mt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <Typography variant="normal" color="blue-gray" className="mb-2">
                {formatDate(props.jobDate)}
              </Typography>
            </div>

            <Typography variant="h5" color="blue-gray" className="mb-2">
              {props.jobTitle}
            </Typography>
            <div className="flex flex-row mb-2">
              <BuildingOfficeIcon className="w-6 h-4 mt-1 text-mantis-600 " />
              <Typography className="font-bold text-mantis-600 ">
                {props.companyName}
              </Typography>
            </div>
            <hr />
            <Typography className="truncate-3-lines">
              {props.jobDescription}
            </Typography>
            <hr />
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
                className="flex items-center gap-2 hover:bg-mantis-700 hover:text-mantis-50"
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
              <BuildingOfficeIcon className="w-6 h-4 mt-1 text-mantis-600 " />
              <Typography className="font-bold text-mantis-600 ">
                {props.companyName}
              </Typography>
            </div>
            <div className="overflow-auto max-h-96">
              <Typography>{props.jobDescription}</Typography>
            </div>
            <br />
            <hr />

            {/* INFOOOOOs */}
            <div className="flex flex-row justify-between pt-1 pb-1">
              {/* <div className="flex flex-row">
                <CommandLineIcon className="w-6 h-4 mt-1 text-mantis-600 " />
                <Typography className="font-bold text-mantis-600 ">
                  {props.level} Level
                </Typography>
              </div> */}
              <div className="flex flex-row">
                <SparklesIcon className="w-5 h-5 pt-1 mr-1 text-mantis-600" />
                <Typography className="font-bold text-mantis-600 ">
                  {props.salary}
                </Typography>
              </div>

              <div className="flex flex-row">
                {props.jobSalary !== null && props.jobSalary !== 0 && (
                  <Typography className="font-bold text-mantis-600">
                    {"$" + props.jobSalary}
                  </Typography>
                )}
              </div>
              {/* <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-4 mt-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <Typography variant="normal" color="blue-gray" className="mb-2">
                  {formatDate(props.jobDate)}
                </Typography>
              </div> */}
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
            </div>
            {/* ENF INFOOOOOOOOOO */}
            <hr />
          </DialogBody>
          <DialogFooter className="flex items-center justify-between">
            <div>
              <div className="flex flex-row">
                <CommandLineIcon className="w-6 h-4 mt-1 text-mantis-600 " />
                <Typography className="font-bold text-mantis-600 ">
                  {props.level} Level
                </Typography>
              </div>

              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-4 mt-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <Typography variant="normal" color="blue-gray" className="mb-2">
                  {formatDate(props.jobDate)}
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
                className="bg-mantis-600 hover:bg-mantis-700 text-mantis-50"
                onClick={() => handleApply(props.jobPosting)}
              >
                <span>Apply</span>
              </Button>
            </div>
          </DialogFooter>
        </Dialog>


      </div>
    </>
  );
}
