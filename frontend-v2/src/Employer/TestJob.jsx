import EmployerNavbar from "./EmployerNavbar";
import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  Button,
  Typography,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import axios from "axios";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { Toaster,toast } from "react-hot-toast";
export default function TestJob() {
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");
  const [salaryEstimation, setSalaryEstimation] = useState("");

  const fetchSalaryEstimation = async () => {
    try {
      const authToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/employer/getSalaryEstimation/",
        { jobDescription },
        {
          headers: {
            Authorization: `JWT ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response data:", response.data);
      const salaryEstimationData = response.data.salary_estimation;
      const minSalary = salaryEstimationData.min_salary;
      const maxSalary = salaryEstimationData.max_salary;
      const salaryRange = `$${minSalary} - $${maxSalary}`;
      setSalaryEstimation(salaryRange);
    } catch (error) {
      console.error("Error fetching salary estimation:", error);
      toast.error("An Error Happend.");

    }
  };

  const showSalary = (e) => {
    e.preventDefault();

    if (jobDescription.trim() === "") {
        setError("Job Description is required");
        setSalaryEstimation("");
      } else {
        setError("");
        fetchSalaryEstimation();
      }

  }

  return (
    <>
      <EmployerNavbar selectedItem={2} />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Poetsen+One&display=swap"
      />
      <div className="grid place-items-center mt-20">
        <div className="grid place-items-center">
          <Typography variant="h3" className="text-mantis-800 mb-8">
            Import Job Description
          </Typography>
          <Typography variant="paragraph" className=" mb-4">
            Insert the job description to get estimation of Salary.
          </Typography>

          <Textarea
            color="teal"
            className=""
            label="Job Description"
            rows={7}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            error={error}
          />

          {error && <Typography color="red">{error}</Typography>}
          <div className="mt-4">
            <Button className="flex bg-mantis-600 hover:bg-mantis-700 text-mantis-50" onClick={showSalary}>
              <SparklesIcon className="w-5 h-5 mr-1 mt-0.5" />
              <Typography className="font-bold"> Get Estimation</Typography>
            </Button>
          </div>
            {salaryEstimation && (
                <div className="grid place-items-center mt-10">
          <div className="flex">
            <SparklesIcon className="h-5 w-5 text-mantis-600 ml-1"></SparklesIcon>
            <Typography className="font-poetsen  text-mantis-600 " variant="h2">
              {salaryEstimation}
            </Typography>
            <SparklesIcon className="h-5 w-5 text-mantis-600"></SparklesIcon>
          </div>
          <div>
          <Typography className="mb-2 mt-2">
                      This is the salary per year, suggested by AI.
                    </Typography>
          </div>
          </div>
          )}
        </div>
      </div>

      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}
