import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export function UnderlineTabs({ setActiveTab, activeTab }) {
  const data = [
    {
      label: "Applied",
      value: "APPLIED",
    },
    {
      label: "Accepted",
      value: "ACCEPTED",
    },
    {
      label: "Refused",
      value: "REFUSED",
    },
    {
      label: "Canceled",
      value: "CANCELED",
    },
  ];
  return (
    <Tabs value={activeTab}>
      {" "}
      {/* Use activeTab as value */}
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-gray-900" : ""}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
