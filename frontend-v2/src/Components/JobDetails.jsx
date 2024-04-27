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

  const handleDetails = (jobId) => {
    navigate(`/employer/${jobId}/applications`);
  };

  return (
    <Card
      className="mt-6 w-4/5 max-h-80 overflow-hidden"
      
    >
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Data Analytics Intern
        </Typography>
        <Textarea rows={6} disabled>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
          ratione fugiat ducimus, temporibus alias nostrum commodi sit, tenetur
          officia, aspernatur unde a dolore quos sed doloribus odio? Atque, quis
          expedita?
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
          ratione fugiat ducimus, temporibus alias nostrum commodi sit, tenetur
          officia, aspernatur unde a dolore quos sed doloribus odio? Atque, quis
          expedita?
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
          ratione fugiat ducimus, temporibus alias nostrum commodi sit, tenetur
          officia, aspernatur unde a dolore quos sed doloribus odio? Atque, quis
          expedita?
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
          ratione fugiat ducimus, temporibus alias nostrum commodi sit, tenetur
          officia, aspernatur unde a dolore quos sed doloribus odio? Atque, quis
          expedita?
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
          ratione fugiat ducimus, temporibus alias nostrum commodi sit, tenetur
          officia, aspernatur unde a dolore quos sed doloribus odio? Atque, quis
          expedita?
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
          ratione fugiat ducimus, temporibus alias nostrum commodi sit, tenetur
          officia, aspernatur unde a dolore quos sed doloribus odio? Atque, quis
          expedita?
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
          ratione fugiat ducimus, temporibus alias nostrum commodi sit, tenetur
          officia, aspernatur unde a dolore quos sed doloribus odio? Atque, quis
          expedita?
        </Textarea>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center -space-x-3">
          {avatars}
          {remainingApplicants > 0 && `+${remainingApplicants}`}
        </div>
        <div className="flex items-center -space-x-3">
        <Button color="red">Delete</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
