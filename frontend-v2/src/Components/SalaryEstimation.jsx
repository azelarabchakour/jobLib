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
import { Select, Option } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  BellIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
  CurrencyEuroIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";

export default function SalaryEstimation(props) {
  const navigate = useNavigate();
  const [openModify, setOpenModify] = React.useState(false);
  const handleOpenModify = () => setOpenModify(!openModify);
  const [salary, setSalary] = React.useState(props.salary);

  const handleModify = (jobId) => {
    const accessToken = localStorage.getItem("accessToken");
    const authToken = localStorage.getItem("accessToken");
    axios
      .put(
        `http://127.0.0.1:8000/employer/job/${jobId}/modifyJob/`,
        {
          jobTitle: props.jobTitle,
          jobDescription: props.jobDescription,
          salary: salary,
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
            <CurrencyDollarIcon className="h-10 w-10 text-myBlue-700" />
            <Typography variant="h4" color="blue-gray" className="mb-2 pt-3">
              Salary
            </Typography>
          </div>

          <div className="flex items-center gap-2">
            {props.salary == null ||
            props.salary === "" ||
            props.salary === 0 ? (
              <div className="flex items-center gap-2">
                <Typography variant="h5">
                  {props.salaryMin}$ - {props.salaryMax}$
                </Typography>
                <SparklesIcon width={25}></SparklesIcon>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Typography variant="h5">{props.salary}$</Typography>
                {/* <SparklesIcon width={25}></SparklesIcon> */}
              </div>
            )}
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
        <DialogHeader>Modify The Salary </DialogHeader>
        <DialogBody>
          <div className="flex items-center gap-2">
            <Input
              label="Salary Min"
              icon={<i className="fas fa-heart" />}
              disabled
              value={props.salaryMin + " $"}
            />

            <Typography variant="h5">-</Typography>

            <Input
              label="Salary Max"
              icon={<i className="fas fa-heart" />}
              disabled
              value={props.salaryMax + " $"}
            />
          </div>

          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-px h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            The salary provided by the AI can't be modified.
          </Typography>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Input
                label="Job Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
              <CurrencyDollarIcon className="h-9 w-9" />
              {/* <Typography variant="h6" color="blue-gray" className="">
              $
              </Typography> */}
            </div>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-px h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            If you input a new salary, it will be used instead of the AI one.
          </Typography>
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
