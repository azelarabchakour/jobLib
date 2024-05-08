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
  ShoppingCartIcon,
  BriefcaseIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
export default function EmployeeRole() {
  const navigate = useNavigate();
  const handleChoose = (page) => {
    navigate(page);
  };
  return (
    <Card className="mt-6 w-96 hover:bg-mantis-50">
      <CardBody>
        <div className="mb-4 h-12 w-12 text-gray-900">
          <UserIcon className="text-mantis-600"></UserIcon>
        </div>

        <Typography variant="h5" className="mb-2 text-mantis-900">
          Employee
        </Typography>
        <Typography>I'm a freelancer, looking for a job</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <a href="#" className="inline-block">
          <Button
            size="sm"
            variant="text"
            className="flex items-center gap-2 hover:bg-mantis-700 hover:text-mantis-50"
            onClick={() => handleChoose("/uploadCv")}
          >
            Apply as a Freelancer
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
}
