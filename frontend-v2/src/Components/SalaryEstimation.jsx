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
} from "@heroicons/react/24/solid";

export default function SalaryEstimation() {
  const navigate = useNavigate();
  const handleChoose = (page) => {
    navigate(page);
  };
  return (
    <Card className="mt-6 w-96">
      <CardBody>
          <div className="flex items-center gap-2">
          <CurrencyDollarIcon className="h-10 w-10" />
        <Typography variant="h4" color="blue-gray" className="mb-2 pt-3">
          AI Salary Estimation
        </Typography>
          </div>
       
        <Typography variant="h5">$70000 - $100000</Typography>
        <Typography variant="paragraph">the salary that our AI calculated for you job</Typography>
      </CardBody>

    </Card>
  );
}
