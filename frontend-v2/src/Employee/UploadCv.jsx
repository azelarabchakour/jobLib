import React, { useState } from "react";
import axios from "axios";
import UploadButton from "./UploadButton.jsx";
import Navbar from "./NavBarComponent1.jsx";
import { Alert, Typography } from "@material-tailwind/react";
import EmployeeNavbar from "./EmployeeNavbar.jsx";

function IconSolid() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function UploadCv() {
  return (
    <>
      <EmployeeNavbar  selectedItem={2} />
      <div className="grid place-content-center mt-20">
        <div className="">
          <UploadButton />
        </div>

        <div className="">
          <Alert variant="ghost" icon={<IconSolid />}>
            <Typography className="font-medium">
              Please note the following:
            </Typography>
            <ul className="mt-2 ml-2 list-inside list-disc">
              <li>Changing your resume will reset all your job applications.</li>
              <li>
                All existing matches based on your current resume will be deleted.
              </li>
              <li>
                Ensure that you have saved any important information before
                proceeding.
              </li>
            </ul>
          </Alert>
        </div>
      </div>
    </>
  );
}

export default UploadCv;
