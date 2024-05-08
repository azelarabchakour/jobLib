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

  const handleDetails = (jobId, jobStatus) => {
    if (jobStatus === "POSTED") navigate(`/employer/${jobId}/jobDetails`);
    else navigate(`/employer/${jobId}/details`);
  };

  return (
    <Card
      className="mt-6 w-4/5 max-h-48 overflow-hidden bg-myBlue-50"
      onClick={() => handleDetails(props.id,props.jobStatus)}
    >
      <CardBody>
        <Typography variant="h4" className="mb-2 font-bold text-myBlue-900">
          {props.jobTitle}
        </Typography>
        <Typography className="truncate text-myBlue-950">{props.jobDescription}</Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center -space-x-3">
          
        </div>
        <div className="flex items-center -space-x-3">
          <Button
            variant="text"
            className="flex items-center gap-2 hover:bg-myBlue-600 hover:text-myBlue-50"
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
