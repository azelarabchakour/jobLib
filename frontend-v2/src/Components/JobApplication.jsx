import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
} from "@material-tailwind/react";
import React from "react";
import { Rating } from "@material-tailwind/react";
import person from "../Assets/person.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-yellow-700"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function setRating(score) {
  if (score > 90) return <Rating value={5} readonly ratedColor="blue" />;
  else if (score > 80) return <Rating value={4} readonly ratedColor="blue" />;
  else if (score > 70) return <Rating value={3} readonly ratedColor="blue" />;
  else if (score > 60) return <Rating value={2} readonly ratedColor="blue" />;
  else if (score > 50) return <Rating value={1} readonly ratedColor="blue" />;
  else return <Rating value={0} readonly />;
}

export default function JobApplication(props) {
  const navigate = useNavigate();
  const handleAcceptApplication = async (applicationId, jobId) => {
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
      navigate(`/employer/${jobId}/applications`);
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  const handleRefuseApplication = async (applicationId, jobId) => {
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
      navigate(`/employer/${jobId}/applications`);
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
    <Card color="transparent" className="w-full max-w-[26rem]">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8"
      >
        <Avatar size="lg" variant="circular" src={person} alt="tania andrew" />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {props.firstName} {props.lastName}
            </Typography>
            <div className="flex items-center gap-2 font-bold text-blue-gray-500">
              {props.matchPercentage}
              {setRating(props.matchPercentage)}
            </div>
          </div>
          <Typography color="blue-gray">{props.date}</Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <div className="flex items-center justify-between ">
          <Button
            onClick={() => handleAcceptApplication(props.id, props.jobId)}
          >
            Accept{" "}
          </Button>
          <Button>Refuse </Button>
          <Button>Download Resume </Button>
        </div>
      </CardBody>
    </Card>
  );
}
