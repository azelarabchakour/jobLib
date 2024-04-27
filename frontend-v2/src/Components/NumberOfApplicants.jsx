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
  
  export default function numberOfApplicants() {

    return (
      <Card className="mt-6 w-96">
        <CardBody>
            <div className="flex items-center gap-2">
            <UserGroupIcon className="h-10 w-10" />
          <Typography variant="h4" color="blue-gray" className="mb-2 pt-3">
            Applicants
          </Typography>
            </div>
         
          <Typography variant="h5">12 Candidates</Typography>
        </CardBody>
        <CardFooter className="justify-between">
        <div className="flex items-center -space-x-3">
        <Button
            variant="text"
            className="flex items-center gap-2"
            
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
  