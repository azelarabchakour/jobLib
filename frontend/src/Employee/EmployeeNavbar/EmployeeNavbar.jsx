import React, { useState } from "react";
import "./EmployeeNavbarStyle.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function EmployerNavbar() {
    const [active, setActive] = useState("nav__menu");
    const [icon, setIcon] = useState("nav__toggler");
    const navigate = useNavigate(); // Initialize useNavigate here

    const navToggle = () => {
        if (active === "nav__menu") {
            setActive("nav__menu nav__active");
        } else setActive("nav__menu");

        // Icon Toggler
        if (icon === "nav__toggler") {
            setIcon("nav__toggler toggle");
        } else setIcon("nav__toggler");
    };

    const handleLogout = () => {
        // Clear any stored authentication token or user data
        localStorage.removeItem('token'); // the token is stored in localStorage
        navigate('/'); // Navigate to login page
    };

    return (
        <nav className="nav__employer">
            <a href="#" className="nav__brand">
                JobLib
            </a>
            <ul className={active}>
                <li className="nav__item">
                    <a href="employer-post" className="nav__link">
                        Update your Cv!
                    </a>
                </li>
                <li className="nav__item">
                    <a href="employer-old-jobs" className="nav__link">
                        your matched jobs
                    </a>
                </li>
                <li className="nav__item">
                    <a href="applications" className="nav__link">
                        applications
                    </a>
                </li>
                <li className="nav__item">
                    <a href="../user-info" className="nav__link">
                        Profile
                    </a>
                </li>
                <li className="nav__item">
                    <a href="../employee/Upload-cv" className="nav__link">
                        switch user
                    </a>
                </li>
                <li className="nav__item">
                    {/* Use an anchor tag for logout */}
                    <a href="#" className="nav__link" onClick={handleLogout}>Logout</a>
                </li>
            </ul>
            <div onClick={navToggle} className={icon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    );
}

export default EmployerNavbar;
