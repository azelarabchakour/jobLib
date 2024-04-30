import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import JobPostingCard from "../Components/JobPostingCard";

export default function TabsComponent({ activeJobs, oldJobs }) {
  const [activeTab, setActiveTab] = React.useState("activeJobs");

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 w-96"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
        }}
      >
        <Tab
          value="activeJobs"
          onClick={() => setActiveTab("activeJobs")}
          className={activeTab === "activeJobs" ? "text-gray-900" : ""}
        >
          Active Jobs
        </Tab>
        <Tab
          value="oldJobs"
          onClick={() => setActiveTab("oldJobs")}
          className={activeTab === "oldJobs" ? "text-gray-900" : ""}
        >
          Old Jobs
        </Tab>
      </TabsHeader>
      <TabsBody className="w-full">
        <TabPanel value="activeJobs">
          {activeJobs.map((job) => (
            <JobPostingCard
              id={job.id}
              jobTitle={job.jobTitle}
              jobDescription={job.jobDescription}
              salary={job.salaryMin + "$ - " + job.salaryMax + "$"}
              numberOfApplicants={job.numberOfApplicants}
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
            ></JobPostingCard>
          ))}
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}
