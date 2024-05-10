import React from "react";
import { useState, useEffect } from "react";

import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Alert,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import person from "../Assets/person.jpeg";
import { SparklesIcon } from "@heroicons/react/24/solid";
export default function ListOfApplicants(props) {
  const [openApplicationDialog, setOpenApplicationDialog] =
    React.useState(false);
  const [openAcceptApplicationDialog, setOpenAcceptApplicationDialog] =
    React.useState(false);
  const [selectedApplication, setSelectedApplication] = React.useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const handleOpenApplicationDialog = (application) => {
    setSelectedApplication(application);
    setOpenApplicationDialog(!openApplicationDialog);
  };
  const handleOpenAcceptApplicationDialog = () => {
    setOpenAcceptApplicationDialog(!openAcceptApplicationDialog);
    setOpenApplicationDialog(false);
  };
  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const fetchJobDetails = async () => {
    try {
      const authToken = localStorage.getItem("accessToken");

      if (!authToken) {
        setError("You need to login to access this page.");
        setLoading(false);
        return;
      }
      const response = await axios.get(
        `http://127.0.0.1:8000/employer/jobs/${props.jobId}/`,
        {
          headers: {
            Authorization: `JWT ${authToken}`,
          },
        }
      );
      setJob(response.data);
      props.updateJob(response.data);
    } catch (error) {
      setError("Error fetching data: " + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails(); // Fetch job details on initial render
  }, [props.jobId]); // Re-fetch data whenever jobId changes

  if (!job) {
    return <div>No job found</div>;
  }
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
      handleOpenAcceptApplicationDialog();
      navigate(`/employer/${props.jobId}/details`);
      //setOpenApplicationDialog(!openApplicationDialog);
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
      setOpenApplicationDialog(!openApplicationDialog);
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

  return (
    <>
      <Card className="w-96">
        <List>
          {job.applications
            .filter(
              (application) => application.applicationStatus !== "REFUSED"
            )
            .map((application) => (
              <ListItem
                className="hover:bg-mantis-50"
                onClick={() => handleOpenApplicationDialog(application)}
              >
               

                <div>

                  <div className="flex items-center justify-between">
                    

                    <div className="flex items-center gap-3">
                      <Avatar
                        size="sm"
                        variant="circular"
                        alt="tania andrew"
                        src={person}
                      />
                      <div className="-mt-px flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium font-bold text-mantis-950"
                        >
                          {application.employee.user.first_name}{" "}
                        {application.employee.user.last_name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="text-xs font-normal"
                        >
                          {application.application_date}
                        </Typography>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pl-24">
                      <SparklesIcon
                        width={25}
                        className="text-mantis-600"
                      ></SparklesIcon>
                      <Tooltip
                        content="Match Percentage"
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                        className="bg-white text-gray-800"
                      >
                        <Typography
                          variant="h6"
                          className="pl-2 text-mantis-600"
                        >
                          {application.matchPercentage}%
                        </Typography>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </ListItem>
            ))}
        </List>
      </Card>

      {/* DIALOG FOR Application To accept refuse and download cv */}
      <Dialog
        open={openApplicationDialog}
        handler={handleOpenApplicationDialog}
      >
        {selectedApplication && (
          <>
            <DialogHeader className="justify-between">
              <div className="flex items-center gap-3">
                <Avatar
                  size="sm"
                  variant="circular"
                  alt="tania andrew"
                  src={person}
                />
                <div className="-mt-px flex flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium font-bold text-mantis-950"
                  >
                    {selectedApplication.employee.user.first_name}{" "}
                    {selectedApplication.employee.user.last_name}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="text-xs font-normal"
                  >
                    {selectedApplication.application_date}
                  </Typography>
                </div>
              </div>

              <Button
                variant="text"
                onClick={() => DownloadResume(selectedApplication.employee.id)}
                className="flex items-center gap-3 w-30 hover:bg-mantis-200 hover:text-mantis-950"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>

                <Typography variant="h6">Resume</Typography>
              </Button>
            </DialogHeader>
            <DialogBody>
              <Typography>{selectedApplication.proposalLetter}</Typography>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={() => handleRefuseApplication(selectedApplication.id)}
                className="mr-1"
              >
                <span>Refuse</span>
              </Button>
              <Button
                
                className="bg-mantis-600 hover:bg-mantis-700 text-mantis-50"
                onClick={() => handleOpenAcceptApplicationDialog()}
              >
                <span>Accept</span>
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>

      <Dialog
        size="lg"
        open={openAcceptApplicationDialog}
        handler={handleOpenAcceptApplicationDialog}
      >
        <DialogHeader>Confirm Your Choice </DialogHeader>
        <DialogBody>
          <Alert
            variant="ghost"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-mantis-600"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            }
          >
            <Typography className="font-medium">
              Upon accepting this candidate:
            </Typography>
            <ul className="mt-2 ml-2 list-inside list-disc">
              <li>The position will be filled by the selected candidate.</li>
              <li>
                All other applicants will be notified that the position has been
                filled.
              </li>
              <li>
                The job listing will be marked as complete, and subsequent
                modifications will be restricted.
              </li>
            </ul>
          </Alert>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            className="mr-1"
            onClick={() => handleOpenAcceptApplicationDialog()}
          >
            <span>Cancel</span>
          </Button>
          <Button
            className="bg-mantis-600 hover:bg-mantis-700 text-mantis-50"
            onClick={() => handleAcceptApplication(selectedApplication.id)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
