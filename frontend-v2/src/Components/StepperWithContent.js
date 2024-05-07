import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  Button,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export default function StepperWithContent() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [salaryEstimation, setSalaryEstimation] = useState("");
  const[error,setError] = useState("");

  useEffect(() => {
    if (activeStep === 1) {
      // Fetch salary estimation when on step 2
      fetchSalaryEstimation();
    }
  }, [activeStep]);

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
  
      console.log("Response data:", response.data); // Log the response data
  
      const salaryEstimationData = response.data.salary_estimation;
      const minSalary = salaryEstimationData.min_salary;
      const maxSalary = salaryEstimationData.max_salary;
  
      const salaryRange = `${minSalary} - ${maxSalary}`;
      setSalaryEstimation(salaryRange); // Setting the salary estimation as a string
    } catch (error) {
      console.error("Error fetching salary estimation:", error); // Log any errors
    }
  };
  

  const handleNext = () => {
    if (activeStep === 0 && jobDescription.trim() === "") {
      //alert("Please enter a job description."); // You can handle empty job description
      setError("Job description is required");
      return;
    }

    if (!isLastStep) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <div className="w-2/3 px-24 py-4">
      <div className="">
        {activeStep === 0 && (
          <div>
            <Typography variant="h5">Step 1 : Import Job Description</Typography>
            <Typography>Import Job Description</Typography>
            <Input
              label="Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              error={error}
            />
            {error && <Typography color="red">{error}</Typography>}
          </div>
        )}
        {activeStep === 1 && (
          <div>
            <Typography variant="h5">Step 2 Content</Typography>
            <Typography>Salary Estimation: {salaryEstimation}</Typography>
          </div>
        )}
        {activeStep === 2 && (
          <div>
            <Typography variant="h5">Step 3 Content</Typography>
            <Typography>Post Job</Typography>
          </div>
        )}
      </div>

      <Stepper
        activeStep={activeStep}
        isLastStep={setIsLastStep}
        isFirstStep={setIsFirstStep}
      >
        <Step onClick={() => setActiveStep(0)}>
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 0 ? "blue-gray" : "gray"}
            >
              Step 1
            </Typography>
            <Typography
              color={activeStep === 0 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Import Job Description.
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <SparklesIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 1 ? "blue-gray" : "gray"}
            >
              Step 2
            </Typography>
            <Typography
              color={activeStep === 1 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Salary Estimation.
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <BuildingLibraryIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 2 ? "blue-gray" : "gray"}
            >
              Step 3
            </Typography>
            <Typography
              color={activeStep === 2 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Post Job.
            </Typography>
          </div>
        </Step>
      </Stepper>

      <div className="mt-32 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
