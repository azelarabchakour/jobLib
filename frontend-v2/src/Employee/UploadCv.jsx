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
