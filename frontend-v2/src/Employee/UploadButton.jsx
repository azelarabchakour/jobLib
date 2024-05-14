import { Button, ThemeProvider } from "@material-tailwind/react";
import React, { useState } from "react";
import axios from "axios";
import { Alert, Typography } from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast';
function UploadButton() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [buttonSave, setButtonSave] = useState(false);

  const api = "http://127.0.0.1:8000/employee/employee/me/";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setButtonSave(true);
    // saveFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      // saveFile(droppedFile);
      setButtonSave(true);
    } else {
      setStatus("Please drop a PDF file");
    }
  };

  const saveFile = () => {
    if (!file) {
      setStatus("Please select a file");
      return;
    }

    // Retrieve access token from local storage
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setStatus("Access token not found");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    axios
      .post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setStatus("File Uploaded Successfully");
        toast.success('Resume Uploaded Successfully.');
        setButtonSave(false);
        setFile(null);
      })
      .catch((error) => {
        console.log(error);
        setStatus("Error uploading file");
        toast.error('Error Uploading Resume.');
      });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="grid place-content-center">
        <div
          className="w-full md:w-1/2 lg:w-2/3 xl:w-1/2 border border-dashed border-mantis-600 border-2 rounded-md flex justify-center items-center"
          style={{ width: "800px", height: "300px" }}
        >
          <div
            className="w-64 flex flex-col items-center justify-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className=" w-64 grid place-content-center">
              <input
                id="resume-upload"
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
              />
              <center>
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer text-myBlue-950 px-4 py-2 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={0.75}
                    stroke="currentColor"
                    className="h-20 w-40 text-mantis-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                  <Typography className="font-bold text-mantis-600"> Upload Your Resume</Typography>
                 
                  <p className="text-mantis-800">
                    choose a file or drag it here
                  </p>
                </label>

                {buttonSave && (
                  
                  <Button  className="flex items-center gap-3 bg-mantis-600 text-mantis-50" onClick={saveFile}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                  Upload Resume
                </Button>
                )}
              </center>

            </div>
          </div>
          <br />
        </div>
              <center>

            
        <p className="text-sm text-mantis-700">
          {file && `Selected File: ${file.name}`}
        </p>
        </center>
        <br />
        
      </div>

      <Toaster position="bottom-right" 
      reverseOrder={false}
      />
    </>
  );
}

export default UploadButton;
