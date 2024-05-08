import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Router, useNavigate } from "react-router-dom";
import {
  BellIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
  CurrencyEuroIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";

const EmployerRole = () => {
  const navigate = useNavigate();
  const handleChoose = (page) => {
    navigate(page);
  };
  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <div className="mb-4 h-12 w-12 text-gray-900">
          <BriefcaseIcon className="text-myBlue-600"></BriefcaseIcon>
        </div>
        <Typography variant="h5" className="mb-2 text-myBlue-900">
          Employer
        </Typography>
        <Typography>I'm a client, hiring for a project</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <a href="#" className="inline-block">
          <Button
            size="sm"
            variant="text"
            className="flex items-center gap-2 hover:bg-myBlue-700 hover:text-myBlue-50"
            onClick={() => handleChoose("/jobs")}
          >
            Join as a Client
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default EmployerRole;
