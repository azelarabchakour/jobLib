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
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import {useNavigate } from 'react-router-dom';


export default function StepperWithContent() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [salaryEstimation, setSalaryEstimation] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [error, setError] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [salary, setSalary] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [level, setLevel] = useState("JUNIOR");
  const [jobTitleError, setJobTitleError] = useState("");
  const [levelError, setLevelError] = useState("");
  const navigate = useNavigate();
  
  const toggleInput = () => {
    setShowInput(!showInput);
    // Reset error when hiding the input
    if (!showInput) {
      setError("");
    }
  };

  const handleSalaryChange = (event) => {
    const inputSalary = event.target.value;
    if (buttonClicked) {
      // Check if inputSalary is numeric
      if (!isNaN(inputSalary)) {
        setSalary(inputSalary);
      } else {
        setError("Please enter a valid numeric salary.");
      }
    }
  };

  useEffect(() => {
    if (activeStep === 1) {
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

      console.log("Response data:", response.data);
      const salaryEstimationData = response.data.salary_estimation;
      const minSalary = salaryEstimationData.min_salary;
      setSalaryMin(minSalary);
      const maxSalary = salaryEstimationData.max_salary;
      setSalaryMax(maxSalary);
      const salaryRange = `${minSalary} - ${maxSalary}`;
      setSalaryEstimation(salaryRange);
    } catch (error) {
      console.error("Error fetching salary estimation:", error);
    }
  };

  const handlePostJobClick = (e) => {
    e.preventDefault();
    let isValid = true;

    if (jobTitle.trim() === "") {
      setJobTitleError("Job title is required");
      isValid = false;
    } else {
      setJobTitleError("");
    }

    if (level.trim() === "") {
      setLevelError("Level is required");
      isValid = false;
    } else {
      setLevelError("");
    }

    if (!salary) {
      setSalary(0);
    }


    if (isValid) {
      // Create a new job posting object
      const newPost = {
        jobTitle: jobTitle,
        jobDescription: jobDescription,
        salary: parseInt(salary),
        salaryMin: salaryMin,
        salaryMax: salaryMax,
        level: level,
      };
      // Send a POST request to create the job posting
      axios
        .post(
          "http://127.0.0.1:8000/employer/jobs/addJobWithDetails/",
          newPost,
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((response) => {
          console.log("Job posting created successfully:", response.data);
          // Navigate to the jobs page or perform any other action
          navigate('/jobs');
        })
        .catch((error) => {
          console.error("Error creating job posting:", error);
        });
    }
  };

  const handleNext = () => {
    if (activeStep === 0 && jobDescription.trim() === "") {
      setError("Job description is required");
      return;
    } else {
      setError("");
    }

    if (activeStep === 1 && buttonClicked) {
      if (salary.trim() === "" || isNaN(salary)) {
        setError("Please enter a valid numeric salary.");
        return;
      } else {
        setError("");
      }
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

  const handleButtonClick = () => {
    setShowInput((prevShowInput) => !prevShowInput);
    setButtonClicked((prevClicked) => !prevClicked);
  };

  return (
    <div className="w-2/3 px-24 py-4">
      <div className="">
        {activeStep === 0 && (
          <div>
            <Typography variant="h5">
              Step 1 : Import Job Description
            </Typography>
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
            <Typography>
              This is the salary suggested by AI, wanna enter yours
            </Typography>
            <Button onClick={handleButtonClick}> Enter yours</Button>
            {showInput && (
              <Input type="text" error={error} onChange={handleSalaryChange} />
            )}
            {error && <Typography color="red">{error}</Typography>}
          </div>
        )}
        {activeStep === 2 && (
          <div>
            <Typography variant="h5">Step 3 Content</Typography>
            <Typography>Post Job</Typography>
            <Input label="Job Title" 
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}/>
            {jobTitleError && (
              <Typography color="red">{jobTitleError}</Typography>
            )}
            <Select
              label="Select Level"
              value={level}
              onChange={(value) => setLevel(value)}
              error={levelError}
            >
              <Option value="JUNIOR">Junior Level</Option>
              <Option value="INTERMEDIATE">Intermediate Level</Option>
              <Option value="SENIOR">Senior Level</Option>
              <Option value="EXPERT">Expert Level</Option>
            </Select>
            {levelError && <Typography color="red">{levelError}</Typography>}
            <Button onClick={(e) => handlePostJobClick(e)}>Post Job</Button>
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
