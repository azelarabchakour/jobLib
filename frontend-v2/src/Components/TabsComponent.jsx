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
import JobPostingCard from "../Components/JobPostingCard";

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
      <div className="flex w-full">
        <div className="w-1/4">
          <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4 flex place-content-center">
              <AdjustmentsHorizontalIcon className="h-7 w-7 mr-1 pt-1" />

              <Typography variant="h4" color="blue-gray">
                Filters
              </Typography>
            </div>
            <List>
              <Accordion
                open={openAccordions[1]}
                icon={<Icon id={1} open={openAccordions[1]} />}
              >
                <AccordionHeader onClick={() => handleAccordionToggle(1)}>
                  Experience Level
                </AccordionHeader>
                <AccordionBody className="flex flex-col">
                  <Checkbox
                    ripple={false}
                    defaultUnchecked
                    color="teal"
                    label="Junior Level"
                    className="h-5 w-5 rounded-full border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="Intermediate Level"
                    className="h-5 w-5 rounded-full border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="Senior Level"
                    className="h-5 w-5 rounded-full border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="Expert Level"
                    className="h-5 w-5 rounded-full border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openAccordions[2]}
                icon={<Icon id={2} open={openAccordions[2]} />}
              >
                <AccordionHeader onClick={() => handleAccordionToggle(2)}>
                  <SparklesIcon className="h-5 w-5" />
                  AI Salary Estimation
                </AccordionHeader>
                <AccordionBody className="flex flex-col">
                  <Checkbox
                    ripple={false}
                    defaultUnchecked
                    color="teal"
                    label="Entry Level"
                    className="h-5 w-5 rounded-full border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="Material Tailwind"
                    className="h-5 w-5 rounded-full border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                  <Checkbox
                    defaultUnchecked
                    ripple={false}
                    color="teal"
                    label="Material Tailwind"
                    className="h-5 w-5 rounded-full border-mantis-500 text-mantis-900 transition-all hover:scale-105 hover:before:opacity-0"
                  />
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openAccordions[3]}
                icon={<Icon id={3} open={openAccordions[3]} />}
              >
                <AccordionHeader onClick={() => handleAccordionToggle(3)}>
                  What can I do with Material Tailwind?
                </AccordionHeader>
                <AccordionBody>{/* Content */}</AccordionBody>
              </Accordion>
            </List>
          </Card>
        </div>
        <div className="w-3/4">
          <Tabs value={activeTab}>
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

            <TabsBody>
              <TabPanel value="activeJobs">
                {activeJobs.map((job) => (
                  <JobPostingCard
                    id={job.id}
                    jobTitle={job.jobTitle}
                    jobDescription={job.jobDescription}
                    salary={job.salaryMin + "$ - " + job.salaryMax + "$"}
                    numberOfApplicants={job.numberOfApplicants}
                    jobStatus={job.jobStatus}
                    level={job.level}
                  ></JobPostingCard>
                ))}
              </TabPanel>

              <TabPanel value="oldJobs">
                {oldJobs.map((job) => (
                  <JobPostingCard
                    id={job.id}
                    jobTitle={job.jobTitle}
                    jobDescription={job.jobDescription}
                    salary={job.salaryMin + "$ - " + job.salaryMax + "$"}
                    numberOfApplicants={job.numberOfApplicants}
                    jobStatus={job.jobStatus}
                  ></JobPostingCard>
                ))}
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </>
  );
}
