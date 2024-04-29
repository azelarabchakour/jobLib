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
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import person from "../Assets/person.jpeg";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function JobDetailsComponent(props) {
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

  const handleDetails = (jobId) => {
    navigate(`/employer/${jobId}/applications`);
  };

  return (
    <Card className="mt-6 w-4/5 max-h-80 overflow-hidden">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {props.jobTitle}
        </Typography>
          <Textarea rows={6} disabled>
            {props.jobDescription}
          </Textarea>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center -space-x-3">
          {avatars}
          {remainingApplicants > 0 && `+${remainingApplicants}`}
        </div>
        <div className="flex items-center -space-x-3">
          <Button color="red" className="flex items-center">
            {" "}
            <TrashIcon className="w-4 mr-2"></TrashIcon> Delete
          </Button>
          <div className="pr-10"></div>
          <Button color="orange" className="flex items-center">
            {" "}
            <PencilIcon className="w-4 mr-2"></PencilIcon> Modify
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
