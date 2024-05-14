import EmployeeNavbar from "./EmployeeNavbar";
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
import { CurrencyDollarIcon, SparklesIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function TestJD() {
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
  const [matchPercentage, setMatchPercentage] = useState(null);
  const [formattedMatchPercentage, setFormattedMatchPercentage] = useState(null);
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
        "http://127.0.0.1:8000/employee/testCv/",
        { jobDescription },
        {
          headers: {
            Authorization: `JWT ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response data:", response.data);
      const salaryEstimationData = response.data.estimation;
      const minSalary = salaryEstimationData.min_salary;
      setSalaryMin(minSalary);
      const maxSalary = salaryEstimationData.max_salary;
      setSalaryMax(maxSalary);
      const salaryRange = `$${minSalary} - $${maxSalary}`;
      setSalaryEstimation(salaryRange);
      setMatchPercentage(response.data.similarity.toFixed(2));
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
          navigate("/jobs");
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
    <>
     <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Poetsen+One&display=swap" />

      <EmployeeNavbar selectedItem={3} />

      <>
        <div className="flex justify-center items-center mt-20">
          <div className="w-2/3 px-24 py-4 ">
            <div className="flex justify-center items-center">
              {activeStep === 0 && (
                <div>
                  <Typography variant="h3" className="text-mantis-800 mb-8">
                    Step 1 : Import Job Description
                  </Typography>
                  <Typography className="font-bold mb-4">
                    Import Job Description
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
                </div>
              )}
              {activeStep === 1 && (
                <div className="grid place-items-center">
                  <Typography variant="h3" className="text-mantis-800 mb-8 ">
                    Step 2 : Salary Estimation
                  </Typography>
                  <div className="flex mb-2 flex-col">
                    <div className="flex">
                  <SparklesIcon className="h-5 w-5 text-mantis-600 ml-1"></SparklesIcon>
                    <Typography className="font-poetsen  text-mantis-600 " variant="h2" > 
                      {salaryEstimation}
                    </Typography>
                    <SparklesIcon className="h-5 w-5 text-mantis-600"></SparklesIcon>
                    </div>

                    <Typography className="mb-2 ml-8 mt-2">
                    This is the salary per year, suggested by AI.
                  </Typography>

                  </div>

                  
                </div>
              )}
              {activeStep === 2 && (
                <div className="flex flex-col justify-between  grid place-items-center">
                  <Typography variant="h3" className="text-mantis-800 mb-4">
                    Step 3 : Match Percentage
                  </Typography>
                  <div className="mb-4 grid place-items-center">
                    {" "}
                    <div className="flex">
                    <SparklesIcon className="h-5 w-5 text-mantis-600 ml-1"></SparklesIcon>
                    <Typography className="font-poetsen  text-mantis-600 " variant="h2" > 
                    {matchPercentage}%
                    </Typography>
                    <SparklesIcon className="h-5 w-5 text-mantis-600"></SparklesIcon>
                    </div>
                  </div>
                  <Typography className="mb-2 ml-8">
                    This is your compatibility score with the job description.
                  </Typography>
                  
                </div>
              )}
            </div>

            <Stepper
              activeStep={activeStep}
              isLastStep={setIsLastStep}
              isFirstStep={setIsFirstStep}
              className="mt-8"
              activeLineClassName="bg-mantis-600"
            >
              <Step
                onClick={() => setActiveStep(0)}
                activeClassName="bg-mantis-700"
                completedClassName="bg-mantis-800"
              >
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
                    className={
                      activeStep === 1
                        ? "text-mantis-700 font-normal"
                        : "text-black font-normal"
                    }
                  >
                    Import Job Description.
                  </Typography>
                </div>
              </Step>
              <Step
                onClick={() => setActiveStep(1)}
                activeClassName="bg-mantis-700"
                completedClassName="bg-mantis-800"
              >
                <CurrencyDollarIcon className="h-5 w-5" />
                <div className="absolute -bottom-[4.5rem] w-max text-center">
                  <Typography
                    variant="h6"
                    color={activeStep === 1 ? "blue-gray" : "gray"}
                  >
                    Step 2
                  </Typography>
                  <Typography
                    color={activeStep === 1 ? "blue-gray" : "gray"}
                    className={
                      activeStep === 1
                        ? "text-mantis-700 font-normal"
                        : "text-black font-normal"
                    }
                  >
                    Salary Estimation.
                  </Typography>
                </div>
              </Step>
              <Step
                onClick={() => setActiveStep(2)}
                activeClassName="bg-mantis-700"
                completedClassName="bg-mantis-800"
              >
                <SparklesIcon className="h-5 w-5" />
                <div className="absolute -bottom-[4.5rem] w-max text-center">
                  <Typography
                    variant="h6"
                    color={activeStep === 2 ? "blue-gray" : "gray"}
                  >
                    Step 3
                  </Typography>
                  <Typography
                    color={activeStep === 2 ? "blue-gray" : "gray"}
                    className={
                      activeStep === 2
                        ? "text-mantis-700 font-normal"
                        : "text-black font-normal"
                    }
                  >
                    Match Percentage
                  </Typography>
                </div>
              </Step>
            </Stepper>

            <div className="mt-32 flex justify-between">
              <Button
                onClick={handlePrev}
                disabled={isFirstStep}
                className={`${
                  isFirstStep
                    ? "bg-gray-700"
                    : "bg-mantis-700 hover:bg-mantis-800"
                } text-mantis-50`}
              >
                Prev
              </Button>
              <Button
                onClick={handleNext}
                disabled={isLastStep}
                className={`${
                  isLastStep
                    ? "bg-gray-700"
                    : "bg-mantis-700 hover:bg-mantis-800"
                } text-mantis-50`}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
