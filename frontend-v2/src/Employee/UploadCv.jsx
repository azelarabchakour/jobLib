import React, { useState } from "react";
import axios from "axios";
import UploadButton from "../Components/UploadCv.js";
import Navbar from "./NavBarComponent1.jsx";
function UploadCv() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const api = "http://127.0.0.1:8000/employee/employee/me/";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
      })
      .catch((error) => {
        console.log(error);
        setStatus("Error uploading file");
      });
  };

  return (
    <>
      <Navbar />
      <center>
        <UploadButton />
      </center>
      <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
      <p>{file && `Selected File: ${file.name}`}</p>
      <button onClick={saveFile}>Upload</button>
      <p>{status}</p> Displaying status
    </>
  );
}

export default UploadCv;
