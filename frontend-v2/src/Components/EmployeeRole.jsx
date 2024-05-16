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
import AuthEmployee from "../Authentication/AuthEmployee";
export default function EmployeeRole() {
  const navigate = useNavigate();

  // const handleChoose = (page) => {
  //   navigate(page);
  // };
  return (
    <Card className="mt-6 w-96 hover:bg-mantis-50">
      <CardBody>
        <div className="mb-4 h-12 w-12 text-gray-900">
          <UserIcon className="text-mantis-600"></UserIcon>
        </div>

        <Typography variant="h5" className="mb-2 text-mantis-900">
          Job Seeker
        </Typography>
        <Typography>I'm a professional, looking for a job</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <AuthEmployee />
      </CardFooter>
    </Card>
  );
}
