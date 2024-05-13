import { Button, ThemeProvider } from "@material-tailwind/react";
import React, { useState } from "react";
import axios from "axios";
import { Alert, Typography } from "@material-tailwind/react";

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
        setButtonSave(false);
      })
      .catch((error) => {
        console.log(error);
        setStatus("Error uploading file");
      });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="absolute w-full md:w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          className="w-full md:w-1/2 lg:w-2/3 xl:w-1/2 border border-dashed border-myBlue-900 border-2 rounded-md flex justify-center items-center"
          style={{ width: "800px", height: "300px" }}
        >
          <div
            className="w-64 flex flex-col items-center justify-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className=" w-64">
              <input
                id="resume-upload"
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
              />
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
                  className="h-20 w-40"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload Your Resume
                <p className="text-myBlue-400">choose a file or drag it here</p>
              </label>
              {/* <Button variant="gradient" className="flex items-center gap-3" onClick={saveFile}>
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
                Upload Files
              </Button> */}
            </div>
          </div>
          <br />
        </div>

       

        <p className="text-sm text-gray-600">
          {file && `Selected File: ${file.name}`}
        </p>
        <br />
        <p
          className={`text-sm ${
            status === "File Uploaded Successfully"
              ? "text-myBlue-950"
              : "text-red-600"
          }`}
        >
          {status}
        </p>
      </div>

      {buttonSave && (
        <Button
          onClick={saveFile}
          variant="gradient"
          className="flex items-center gap-3"
        >
          Save
        </Button>
      )}
    </>
  );
}

export default UploadButton;
