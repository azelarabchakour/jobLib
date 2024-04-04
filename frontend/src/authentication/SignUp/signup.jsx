import React, { useState } from 'react';
import axios from 'axios';
import './signupStyle.css'; // Import the CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/auth/users/', {
        username,
        email,
        password,
      });

      // Registration successful
      console.log('Registration successful:', response.data);
      // Redirect the user to the switch-user page
      window.location.href = '/switch-user';
    } catch (error) {
      console.error('Registration failed:', error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container">
  <form className="signup-form" onSubmit={handleSubmit}>
    {/* <p>REGISTER NOW</p> */}
    <h2 className="signup-title">Sign Up For Free</h2>
    <h5>already have an account? <a href='/login'>Sign In</a> </h5> <br></br>
    {error && <p className="error-message">{error}</p>}
    <div>
      <label className="form-label">Username</label>
      <input className="form-input" type="text" value={username}  onChange={(e) => setUsername(e.target.value)} />
    </div>
    <div>
      <label className="form-label">Email</label>
      <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div>
      <label className="form-label">Password</label>
      <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    <div>
      <label className="form-label">Confirm Password</label>
      <input className="form-input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
    </div>
    <button className="signup-button" type="submit">Sign Up</button>
  </form>
  <img src={require('../../Assets/signup2.png')} alt="signup" className="signup-image" />

</div>

  );
};

export default Signup;
