import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SignInDialog } from "./Components/SignIn";
import FooterComponent from "./Components/Footer";
import Auth from "./Components/Auth";
import { PricingCard } from "./Components/PricingCard";
import JobPostingCard from "./Components/JobPostingCard";
import CreateJobPosting from "./Components/CreateJobPosting";
import AlertWithList from "./Components/AlertWithList";
// import UploadCv from "./Components/UploadCv";
import StepperWithContent from "./Components/StepperWithContent";
import { ThemeProvider } from "@material-tailwind/react";
import HomePage from "./HomePage/HomePage";
import EmployeeRole from "./Components/EmployeeRole";
import EmployerRole from "./Components/EmployerRole";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    
    <App />

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
