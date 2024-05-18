import { useState } from "react";
import Auth from "../Components/Auth";
import Navbar from './HomePageComponents/NavBar.jsx';
import HeroSection from "./HomePageComponents/HeroSection.jsx";
import FeatureSection from "./HomePageComponents/FeatureSection.jsx";
import Footer from "./HomePageComponents/FooterSection.jsx";

export default function EmployeeNavbarHomePage() {
    return (
      <>
        <Navbar/>
        <HeroSection/>
        
      </>
    );
  }