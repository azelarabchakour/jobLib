import React, { useState } from "react";
import axios from "axios";
import UploadButton from "./UploadButton.jsx";
import Navbar from "./NavBarComponent1.jsx";
function UploadCv() {
  return (
    <>
      <Navbar />
      <center>
        <UploadButton />
      </center>
    </>
  );
}

export default UploadCv;

{
  /* <>
      <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
      <p>{file && `Selected File: ${file.name}`}</p>
      <button onClick={saveFile}>Upload</button>
      <p>{status}</p>
    </> */
}
