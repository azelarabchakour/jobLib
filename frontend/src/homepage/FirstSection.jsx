import React from "react";

function FirstSection() {
    return (
    <div className="first-section">
        <div className="first-section-text">
            <h1>Find Your Dream Job</h1> <br/>
            <p>We're here to help you find jobs that suit your skills with AI ! Start your search today!</p> <br/>
            <button className="btn">Find Jobs</button>
        </div>
        <div className="first-section-image">
            <img src={require('../Assets/signup3.png')} alt="ima" />
        </div>
    </div>
    );
}

export default FirstSection;