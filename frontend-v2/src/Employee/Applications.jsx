import React, { useState, useEffect } from "react";
import axios from "axios";
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
  CardHeader,
  Chip,
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
import EmployeeNavbar from "./EmployeeNavbar";

export default function Applications() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openModify, setOpenModify] = React.useState(false);
  const handleOpenModify = () => setOpenModify(!openModify);
  // Function to format the date
  function parseDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed in Date object
  }
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
  const handleRowClick = (id) => {
    handleOpenModify();
    const selected = jobs.find((job) => job.id === id);
    setSelectedJob(selected);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

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
          id: job.id,
          jobTitle: job.job_posting.jobTitle,
          jobDescription: job.job_posting.jobDescription,
          applicationDate: job.application_date,
          applicationStatus: job.applicationStatus,
          employer: job.job_posting.employer.user.username,
          salaryMin: job.job_posting.salaryMin,
          salaryMax: job.job_posting.salaryMax,
          salary: job.job_posting.salary,
          matchPercentage: job.matchPercentage,
          companyName: job.job_posting.companyName,
          level: job.job_posting.level,
          jobDate: job.job_posting.jobDate,
        }));
        setJobs(updatedJobs);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data: " + error.message);
        setLoading(false);
      });
  }, []);

  const TABLE_ROWS = jobs.map((job) => ({
    id: job.id,
    company: job.companyName,
    title: job.jobTitle,
    salary:
      job.salary !== 0 && job.salary!== null
        ? `$${job.salary}`
        : `$${job.salaryMin} - $${job.salaryMax}`,
    applicationDate: job.applicationDate,
    percentage: job.matchPercentage, // You can set account information here if needed
    status: job.applicationStatus, // You can set account information here if needed
  }));
  const TABLE_HEAD = [
    "Company",
    "Job",
    "Salary",
    "Application Date",
    "Match Percentage",
    "Status",
  ];

  return (
    <>
    <EmployeeNavbar selectedItem={1} />
      <Card className="h-full w-3/4 mx-auto mt-8 p-2">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="">
              <Typography variant="h5" className="text-mantis-700">
                My Applications
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are details about the last applications
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-mantis-100  p-4"
                  >
                    <Typography
                      variant="small"
                      className="font-bold text-mantis-950 leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                ({
                  id,
                  company,
                  title,
                  salary,
                  applicationDate,
                  percentage,
                  status,
                }) => {
                  const isLast = id === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr
                      key={id}
                      onClick={() => handleRowClick(id)}
                      style={{ cursor: "pointer" }}
                    >
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal max-w-40"
                          >
                            {company}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal max-w-40"
                          >
                            {title}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {salary}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {applicationDate}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-row">
                          <SparklesIcon className="w-5 h-5  mr-1 text-mantis-600" />
                            <Typography
                              variant="small"
                              className="font-normal"
                            >
                                
                              {percentage}%
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={
                              status === "APPLIED"
                                ? "Pending"
                                : status === "TAKEN"
                                ? "Position Filled "
                                : status === "CANCELED"
                                ? "No Longer Available"
                                : status
                            }
                            color={
                              status === "ACCEPTED"
                                ? "green"
                                : status === "APPLIED"
                                ? "amber"
                                : "red"
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Dialog size="lg" open={openModify} handler={handleOpenModify}>
        {selectedJob && (
          <>
            <DialogHeader> {selectedJob.jobTitle} </DialogHeader>
            <DialogBody>
              <div className="flex flex-row">
                <BuildingOfficeIcon className="w-6 h-4 mt-1 text-mantis-600 " />
                <Typography className="font-bold text-mantis-600 ">
                  {selectedJob.companyName}
                </Typography>
              </div>
              <div className="overflow-auto max-h-96">
                <Typography>{selectedJob.jobDescription}</Typography>
              </div>
              <br />
              <hr />

              {/* INFOOOOOs */}
              <div className="flex flex-row justify-between pt-1 pb-1">
                <div className="flex flex-row">
                  <SparklesIcon className="w-5 h-5 pt-1 mr-1 text-mantis-600" />
                  <Typography className="font-bold text-mantis-600 ">
                    {"$" +
                      selectedJob.salaryMin +
                      " - $" +
                      selectedJob.salaryMax}{" "}
                  </Typography>
                </div>

                <div className="flex flex-row">
                  {selectedJob.salary !== null && selectedJob.salary !== 0 && (
                    <Typography className="font-bold text-mantis-600">
                      {"$" + selectedJob.salary}
                    </Typography>
                  )}
                </div>
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
                      {selectedJob.matchPercentage}%
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
                    {selectedJob.level} Level
                  </Typography>
                </div>
              </div>
              <div>
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

                  <Typography
                    variant="normal"
                    color="blue-gray"
                    className="mb-2"
                  >
                    {formatDate(selectedJob.jobDate)}
                  </Typography>
                </div>
                {/* <Button
                variant="text"
                color="red"
                className="mr-1"
                onClick={() => handleOpenModify()}
              >
                <span>Cancel</span>
              </Button>
              <Button
              className="bg-mantis-600 hover:bg-mantis-700 text-mantis-50"
                // onClick={() => handleApply(props.jobPosting)}
              >
                <span>Apply</span>
              </Button> */}
              </div>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </>
  );
}
