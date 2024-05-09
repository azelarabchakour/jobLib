import React, { useEffect } from "react";
import heroImg from "./assets/img/hero-img.png";
import AOS from "aos";

export const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="index-page">
      <div id="home-page">
        {/* Navbar Start */}
        <header
          id="header"
          className="header d-flex align-items-center fixed-top"
        >
          <div className="container-fluid container-xl position-relative d-flex align-items-center">
            <h1 className="sitename logo me-auto">
              <a href="/">JobMatch</a>
            </h1>
            {/* Uncomment below if you prefer to use an image logo */}
            {/* <a href="index.html" className="logo me-auto"><img src="assets/img/logo.png" alt="" className="img-fluid" /></a> */}

            <nav id="navbar" className="navbar">
              <ul>
                <li>
                  <a className="nav-link scrollto active" href="#hero">
                    Home
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#about">
                    About
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#services">
                    Services
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#team">
                    Team
                  </a>
                </li>
                <li className="dropdown">
                  <a href="#">
                    <span>Drop Down</span>{" "}
                    <i className="bi bi-chevron-down"></i>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Drop Down 1</a>
                    </li>
                    <li className="dropdown">
                      <a href="#">
                        <span>Deep Drop Down</span>{" "}
                        <i className="bi bi-chevron-right"></i>
                      </a>
                      <ul>
                        <li>
                          <a href="#">Deep Drop Down 1</a>
                        </li>
                        <li>
                          <a href="#">Deep Drop Down 2</a>
                        </li>
                        <li>
                          <a href="#">Deep Drop Down 3</a>
                        </li>
                        <li>
                          <a href="#">Deep Drop Down 4</a>
                        </li>
                        <li>
                          <a href="#">Deep Drop Down 5</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">Drop Down 2</a>
                    </li>
                    <li>
                      <a href="#">Drop Down 3</a>
                    </li>
                    <li>
                      <a href="#">Drop Down 4</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#contact">
                    Contact
                  </a>
                </li>
                <li>
                  <a className="getstarted scrollto" href="#about">
                    Get Started
                  </a>
                </li>
              </ul>
              <i className="bi bi-list mobile-nav-toggle"></i>
            </nav>
          </div>
        </header>
        {/* Navbar End */}
        {/* Hero Start */}
        <section id="hero" className="hero section d-flex align-items-center">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <h1>Better AI Solutions For Your Job</h1>
                <h2>
                  Improve Your Business, build your Best carrer using AI !
                </h2>
                <div className="d-flex justify-content-center justify-content-lg-start">
                  <a href="#about" className="btn-get-started scrollto">
                    Get Started
                  </a>
                </div>
              </div>
              <div
                className="col-lg-6 order-1 order-lg-2 hero-img"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <img
                  src={heroImg}
                  className="img-fluid animated"
                  alt="hero img"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Hero End */}
        About Start
      </div>
    </div>
  );
};
