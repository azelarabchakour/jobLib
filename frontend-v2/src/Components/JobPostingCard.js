import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import person from "../Assets/person.jpeg";

export default function JobPostingCard(props) {
  const numberOfApplicants = props.numberOfApplicants;
  const navigate = useNavigate();
  // Determine the number of avatars to show and the count of remaining applicants
  const avatarsToShow = Math.min(numberOfApplicants, 5);
  const remainingApplicants = numberOfApplicants - avatarsToShow;

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

  const handleDetails = (jobId, jobStatus) => {
    if (jobStatus === "POSTED") navigate(`/employer/${jobId}/jobDetails`);
    else navigate(`/employer/${jobId}/details`);
  };

  return (
    <Card
      className="mt-6 w-4/5 max-h-48 overflow-hidden"
      onClick={() => handleDetails(props.id,props.jobStatus)}
    >
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {props.jobTitle}
        </Typography>
        <Typography className="truncate">{props.jobDescription}</Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center -space-x-3">
          {avatars}
          {remainingApplicants > 0 && `+${remainingApplicants}`}
        </div>
        <div className="flex items-center -space-x-3">
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={() => handleDetails(props.id,props.jobStatus)}
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
  );
}
