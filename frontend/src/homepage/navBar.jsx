import React from 'react';
import { Link } from 'react-router-dom';
import './../index.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Sign in</Link>
        </li>
        <nav className="navbar">
            
        </nav>
      </ul>
    </nav>
  );
};

export default Navbar;
