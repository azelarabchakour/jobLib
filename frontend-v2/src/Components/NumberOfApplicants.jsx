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
  Battery50Icon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

export default function NumberOfApplicants(props) {
  const navigate = useNavigate();

  const handleClick = (event,jobId) => {
    event.preventDefault();
    navigate(`/employer/${jobId}/applicants`);
  };
  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <div className="flex items-center gap-2">
          <UserGroupIcon className="h-10 w-10" />
          <Typography variant="h4" color="blue-gray" className="mb-2 pt-3">
            Applicants
          </Typography>
        </div>

        <Typography variant="h5">{props.numberOfApplicants} Candidates</Typography>
      </CardBody>
      <CardFooter className="justify-between pt-0">
          <div style={{ position: "relative" }}>
            <div className="flex items-center justify-end">
              <b>
                <a href="#" onClick={(event) => handleClick(event,props.jobId)}>Show All</a>
              </b>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
                style={{ marginLeft: "5px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </div>
          </div>
      </CardFooter>
    </Card>
  );
}
