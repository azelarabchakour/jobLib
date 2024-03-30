import React from 'react';
import Navbar from './navBar';

function HomePage() {
    return (
        <div>
            <Navbar />
            <div className="homepage-content">
                <h2>Find the suitable job for you!</h2>
                <p>This is the homepage content...</p>
            </div>
        </div>
    );
}

export default HomePage;
