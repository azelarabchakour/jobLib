import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './authentication/Login/login.jsx';
import Signup from './authentication/SignUp/signup.jsx';
import Profile from './Profile/Profile';
import ForgetPass from './authentication/ResetPassword/ForgetPassword.jsx';
import ResetPass from './authentication/ResetPassword/ResetPassword.jsx';
import HomePage from './homepage/homePage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forget-password" element={<ForgetPass/>} />
        <Route path="/reset-password" element={<ResetPass/>} />
      </Routes>
    </Router>
  );
}

export default App;
