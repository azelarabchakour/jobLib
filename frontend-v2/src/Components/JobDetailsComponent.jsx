import React from "react";
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
import { useNavigate } from "react-router-dom";
import person from "../Assets/person.jpeg";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useState, useEffect } from "react";

function IconSolid() {
  return (
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
  );
}
export default function JobDetailsComponent(props) {
  const numberOfApplicants = props.numberOfApplicants;
  const navigate = useNavigate();
  // Determine the number of avatars to show and the count of remaining applicants
  const avatarsToShow = Math.min(numberOfApplicants, 5);
  const remainingApplicants = numberOfApplicants - avatarsToShow;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const [openModify, setOpenModify] = React.useState(false);
  const handleOpenModify = () => setOpenModify(!openModify);

  const [openModifyConfirmation, setOpenModifyConfirmation] =
    React.useState(false);
  const handleOpenModifyConfirmation = () =>
    setOpenModifyConfirmation(!openModifyConfirmation);

  const [jobTitleComponent, setJobTitle] = useState(props.jobTitle);
  const [jobDescription, setJobDescription] = useState(props.jobDescription);

  const accessToken = localStorage.getItem("accessToken");

  // Create an array of JSX elements representing avatars
  const avatars = Array.from({ length: avatarsToShow }, (_, index) => (
    <Avatar
      size="sm"
      variant="circular"
      alt={`Applicant ${index + 1}`}
      src={person}
      className="border-2 border-white hover:z-10"
    />
  ));

  const handleDetails = (jobId) => {
    navigate(`/employer/${jobId}/applications`);
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
        navigate(`/jobs`);
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
      });
  };

  const handleModify = (jobId) => {
    const accessToken = localStorage.getItem("accessToken");
    const authToken = localStorage.getItem("accessToken");
    axios
      .put(
        `http://127.0.0.1:8000/employer/job/${jobId}/modifyJob/`,
        {
          jobTitle: jobTitleComponent,
          jobDescription: jobDescription,
        },
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Job updated successfully:", response.data);
        navigate(`/employer/${jobId}/jobDetails`);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating job:", error);
        // Handle error
      });
  };

  return (
    <>
      <Card className="mt-6 w-4/5 max-h-80 overflow-hidden hover:bg-mantis-50">
        <CardBody>
          <Typography variant="h4" className="mb-2 pt-3 text-mantis-950">
          {jobTitleComponent}
          </Typography>
          <Textarea rows={6} disabled>
            {jobDescription}
          </Textarea>
        </CardBody>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center -space-x-3">
            {avatars}
            {remainingApplicants > 0 && `+${remainingApplicants}`}
          </div>
          {props.jobStatus === "POSTED" && (
            <div className="flex items-center -space-x-3">
              <Button
                color="red"
                className="flex items-center"
                onClick={() => handleOpen()}
              >
                {" "}
                <TrashIcon className="w-4 mr-2"></TrashIcon> Delete
              </Button>
              <div className="pr-10"></div>
              <Button
                color="orange"
                className="flex items-center"
                onClick={() => handleOpenModify()}
              >
                {" "}
                <PencilIcon className="w-4 mr-2"></PencilIcon> Modify
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
      {/* DELETE Dialog */}
      <Dialog size="lg" open={open} handler={handleOpen}>
        <DialogHeader>Confirm Your Choice </DialogHeader>
        <DialogBody>
          <Alert variant="ghost" icon={<IconSolid />}>
            <Typography className="font-medium">
              Are you sure you want to delete this job?
            </Typography>
            <ul className="mt-2 ml-2 list-inside list-disc">
              <li>This action cannot be undone.</li>
              <li>
                All associated data, including applicants, will be permanently
                removed.
              </li>
              <li>Deleted job listings cannot be restored.</li>
            </ul>
          </Alert>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="green"
            className="mr-1"
            onClick={() => handleOpen()}
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={() => handleDelete(props.jobId)}
          >
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
      {/* MODIFY Dialog */}
      <Dialog size="lg" open={openModify} handler={handleOpenModify}>
        <DialogHeader>Modify your Job </DialogHeader>
        <DialogBody>
          <Input
            label="Title"
            color="teal"
            value={jobTitleComponent}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <div
            className="p-2"
          >

          </div>
          <Textarea
            label="Description"
            color="teal"
            rows={6}
            onChange={(e) => setJobDescription(e.target.value)}
          >
            {props.jobDescription}
          </Textarea>
          <Alert variant="ghost" icon={<IconSolid/>}>
            <Typography className="font-medium">
              Please note the following:
            </Typography>
            <ul className="mt-2 ml-2 list-inside list-disc">
              <li>
                Modifying the job description will update the estimated salary
                calculated by AI.
              </li>
              <li>
                All applicants associated with this job will be permanently
                deleted.
              </li>
              <li>This action cannot be undone.</li>
            </ul>
          </Alert>
        </DialogBody>
        <DialogFooter>
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
            onClick={() => handleModify(props.jobId)}
          >
            <span>Modify </span>
          </Button>
        </DialogFooter>
      </Dialog>
      
    </>
  );
}
