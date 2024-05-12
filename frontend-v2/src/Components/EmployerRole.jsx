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
import AuthEmployer from "../Authentication/AuthEmployer";
const EmployerRole = () => {
  const navigate = useNavigate();
  const handleChoose = (page) => {
    navigate(page);
  };
  return (
    <Card className="mt-6 w-96 hover:bg-mantis-50">
      <CardBody>
        <div className="mb-4 h-12 w-12 text-gray-900">
          <BriefcaseIcon className="text-mantis-600"></BriefcaseIcon>
        </div>
        <Typography variant="h5" className="mb-2 text-mantis-900">
          Employer
        </Typography>
        <Typography>I'm a project manager, recruiting for a position.</Typography>
      </CardBody>
      <CardFooter className="pt-0">
       <AuthEmployer />
      </CardFooter>
    </Card>
  );
};

export default EmployerRole;
