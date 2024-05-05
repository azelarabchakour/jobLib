import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  Avatar,
  Textarea,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Alert,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { Select, Option } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { Router, useNavigate } from "react-router-dom";

import {
  BellIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
  CurrencyEuroIcon,
  SparklesIcon,
  CommandLineIcon,
} from "@heroicons/react/24/solid";

export default function Level(props) {
  const [value, setValue] = React.useState(props.level);
  const navigate = useNavigate();
  const [openModify, setOpenModify] = React.useState(false);
  const handleOpenModify = () => setOpenModify(!openModify);
  const handleChoose = () => {
    //navigate(page);
  };

  const handleModify = (jobId) => {
    const accessToken = localStorage.getItem("accessToken");
    const authToken = localStorage.getItem("accessToken");
    axios
      .put(
        `http://127.0.0.1:8000/employer/job/${jobId}/modifyJob/`,
        {
          jobTitle: props.jobTitle,
          jobDescription: props.jobDescription,
          level: value,
        },
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Job updated successfully:", response.data);
        navigate(`/employer/${jobId}/jobDetails`);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating job:", error);
        // Handle error
      });
  };

  return (
    <>
      <Card className="mt-6 w-96">
        <CardBody>
          <div className="flex items-center gap-2">
            <CommandLineIcon className="h-10 w-10" />
            <Typography variant="h4" color="blue-gray" className="mb-2 pt-3">
              Experience Level
            </Typography>
          </div>

          <div className="flex items-center gap-2">
            <Typography variant="h5">{props.level} level</Typography>
          </div>
        </CardBody>
        {props.jobStatus === "POSTED" && (
          <CardFooter className="justify-between pt-0">
            <div style={{ position: "relative" }}>
              <div className="flex items-center justify-end">
                <b>
                  <a href="#" onClick={() => handleOpenModify()}>
                    Modify
                  </a>
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
        )}
      </Card>

      {/* MODIFY Dialog */}
      <Dialog size="sm" open={openModify} handler={handleOpenModify}>
        <DialogHeader>Modify Level of The Job </DialogHeader>
        <DialogBody>
          <div className="p-2"></div>
          <Select
            label="Select Level"
            value={value}
            onChange={(val) => setValue(val)}
          >
            <Option value="JUNIOR">Junior Level</Option>
            <Option value="INTERMEDIATE">Intermediate Level</Option>
            <Option value="SENIOR">Senior Level</Option>
            <Option value="EXPERT">Expert Level</Option>
          </Select>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            className="mr-1"
            onClick={() => handleOpenModify()}
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleModify(props.jobId)}
          >
            <span>Modify </span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
