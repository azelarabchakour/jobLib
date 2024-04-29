import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineIcon,
    Typography,
    TimelineHeader,
  } from "@material-tailwind/react";
  import {
    BellIcon,
    ArchiveBoxIcon,
    CurrencyDollarIcon,
  } from "@heroicons/react/24/solid";
import JobPostingCard from "./JobPostingCard";
import EmployeeRole from "./EmployeeRole";
import SalaryEstimation from "./SalaryEstimation";
import JobDetails from "../Components/JobDetails";
import NumberOfApplicants from "../Components/NumberOfApplicants";
import Level from "./Level";
  export default function Test() {
    return (
     <div className="center">
        <Timeline>
             <div className="flex items-center justify-between pr-20 pl-20">
   
          <SalaryEstimation></SalaryEstimation>
          <Level></Level>

            <NumberOfApplicants></NumberOfApplicants>
          </div>
        </Timeline>
        <div className="pl-48">
            <JobDetails></JobDetails>
            

        </div>
        </div>
    );
  }
  