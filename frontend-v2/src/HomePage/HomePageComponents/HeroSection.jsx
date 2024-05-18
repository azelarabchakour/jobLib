import React from "react";
import Auth from "../../Components/Auth";
import heroImg from "../../Assets/hero-img.png";

import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import SignIn from "../../Authentication/SignIn";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Poetsen+One&display=swap"
      />

      <div
        id="home"
        className="relative overflow-hidden bg-primary pt-[100px] md:pt-[130px] sm:pt-[100px] lg:pt-[100px] mt-0 md:mt-[30px] lg:mt-0 h-screen"
        style={{ backgroundColor: "#82bd69" }}
      >
        <div className="container mx-auto px-4">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 px-4 order-2 lg:order-1">
              <div
                className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center lg:text-left md:mt-0 mt-16 md:mt-[100px]"
                data-wow-delay=".2s"
              >
                <h1 className="mb-6 text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-poetsen text-mantis-700  leading-snug">
                AI-Powered Career Boost: Your Dream Job Awaits
                </h1>
                <p className="mx-auto mb-9 max-w-[600px] text-lg sm:text-xl lg:text-xxl font-medium italic text-mantis-50">
                Let AI Work its Magic : Your Dream Job, Just a Click Away!
                </p>
                <ul className="mb-10 flex flex-wrap items-center justify-center lg:justify-start gap-5">
                  <li>
                    <Button
                      className="hover:bg-mantis-50 bg-mantis-700 text-mantis-50 px-7 py-[14px] text-base font-bold hover:text-mantis-950 mr-6 "
                      onClick={() => navigate("/chooseRole")}
                    >
                      Join Us
                    </Button>

                    <SignIn />
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4 order-1 lg:order-2">
              <div
                className="wow fadeInUp relative z-10 mx-auto max-w-[845px]"
                data-wow-delay=".25s"
              >
                <div className="">
                  <img
                    src={heroImg}
                    alt="hero"
                    className="mx-auto max-w-full rounded-t-xl rounded-tr-xl lg:float-right"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
