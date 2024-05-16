import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Select,
  Checkbox,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  AdjustmentsHorizontalIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import JobPostingCard from "./JobPostingCard";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export default function TabsComponent({ activeJobs, oldJobs }) {
  const [activeTab, setActiveTab] = React.useState("activeJobs");

  const [openAccordions, setOpenAccordions] = React.useState({
    1: true, // Accordion with ID 1 will be open by default
  });

  // Function to toggle the state of an Accordion
  const handleAccordionToggle = (accordionId) => {
    setOpenAccordions((prevState) => ({
      ...prevState,
      [accordionId]: !prevState[accordionId], // Toggle the state of the specific Accordion
    }));
  };

  return (
    <>
      <div className="">

        <Tabs value={activeTab} className="">
          <center>
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 w-96"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-mantis-700 shadow-none rounded-none",
            }}
          >
            <Tab
              value="activeJobs"
              onClick={() => setActiveTab("activeJobs")}
              className={
                activeTab === "activeJobs"
                  ? "text-mantis-900 font-bold"
                  : "text-mantis-950"
              }
            >
              Active Jobs
            </Tab>
            <Tab
              value="oldJobs"
              onClick={() => setActiveTab("oldJobs")}
              className={
                activeTab === "oldJobs"
                  ? "text-mantis-900 font-bold"
                  : "text-mantis-950"
              }
            >
              Old Jobs
            </Tab>
          </TabsHeader>
          </center>
          <div className=" ml-60"> {/* Center the content horizontally */}
            <TabsBody >
              <TabPanel value="activeJobs">
                {activeJobs.map((job) => (
                  <JobPostingCard
                    key={job.id}
                    id={job.id}
                    jobTitle={job.jobTitle}
                    jobDescription={job.jobDescription}
                    salary={`${job.salaryMin}$ - ${job.salaryMax}$`}
                    numberOfApplicants={job.numberOfApplicants}
                    jobStatus={job.jobStatus}
                    level={job.level}
                    jobDate={job.jobDate}
                    companyName = {job.companyName}
                    jobSalary={job.salary}
                  />
                ))}
              </TabPanel>
              <TabPanel value="oldJobs">
                {oldJobs.map((job) => (
                  <JobPostingCard
                    key={job.id}
                    id={job.id}
                    jobTitle={job.jobTitle}
                    jobDescription={job.jobDescription}
                    salary={`${job.salaryMin}$ - ${job.salaryMax}$`}
                    numberOfApplicants={job.numberOfApplicants}
                    jobStatus={job.jobStatus}
                    jobDate={job.jobDate}
                    companyName = {job.companyName}
                  />
                ))}
              </TabPanel>
            </TabsBody>
          </div>
        </Tabs>
      </div>
    </>
  );
}
