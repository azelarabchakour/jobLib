import { ThemeProvider } from "@material-tailwind/react";
import React, { useState } from "react";
import axios from "axios";

function UploadButton() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const api = "http://127.0.0.1:8000/employee/employee/me/";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    saveFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    setFile(selectedFile);
    saveFile(selectedFile);
  };

  const saveFile = (selectedFile) => {
    if (!selectedFile) {
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
    formData.append("resume", selectedFile);

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
          className="w-full md:w-1/2 lg:w-2/3 xl:w-1/2 border border-dashed border-myBlue-300 border-2 rounded-md flex justify-center items-center"
          style={{ maxWidth: "500px", height: "auto" }}
        >
          <div
            className="w-64 h-64"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 left-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            <p className="text-myBlue-300 mt-24 text-center">
              choose a file or drag it here
            </p>
            <div className="relative w-64 flex justify-center items-center">
              <input
                id="resume-upload"
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer text-myBlue-950 px-4 py-2 rounded-md flex items-center gap-3"
              >
                Upload Your Resume
              </label>
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
              ? "text-#262c40"
              : "text-red-600"
          }`}
        >
          {status}
        </p>
      </div>
    </>
  );
}

export default UploadButton;
