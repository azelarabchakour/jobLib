import { useState } from "react";
import Auth from "../Components/Auth";
import Navbar from './HomePageComponents/NavBar.jsx';
import HeroSection from "./HomePageComponents/HeroSection.jsx";

export default function HomePage() {
    return (
      <>
        <Navbar/>
        <HeroSection/>

        <Auth/>

      </>
    );
  }