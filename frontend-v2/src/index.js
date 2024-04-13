import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import NavbarComponent from "./Components/Navbar";
import { SignInDialog } from "./Components/SignIn";
import FooterComponent from "./Components/Footer";
import Auth from "./Components/Auth";
import { PricingCard } from "./Components/PricingCard";
import JobPostingCard from "./Components/JobPostingCard";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NavbarComponent />

    <div className="flex flex-col items-center">
      <JobPostingCard />
      <JobPostingCard />
      <JobPostingCard />
    </div>
    
    <FooterComponent />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
