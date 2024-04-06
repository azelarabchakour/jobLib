import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './authentication/Login/login.jsx';
import Signup from './authentication/SignUp/signup.jsx';
import ForgetPass from './authentication/ResetPassword/ForgetPassword.jsx';
import ResetPass from './authentication/ResetPassword/ResetPassword.jsx';
import HomePage from './homepage/homePage.jsx';
import EmployerPost from './Employer/EmployerPost.jsx';
import EmployerGetJobs from './Employer/EmployerGetJobs.jsx';
import EditJob from './Employer/EditJob.jsx';
import SwitchUser from './SwitchUser/SwitchUser.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/switch-user" element={<SwitchUser />} />
        <Route path="/forget-password" element={<ForgetPass/>} />
        <Route path="/reset-password" element={<ResetPass/>} />
        <Route path="/employer-post"  element={<EmployerPost/>} />
        <Route path="/employer-old-jobs"  element={<EmployerGetJobs/>} />
        <Route path="/edit-job/:jobId" element={<EditJob />} />
      </Routes>
    </Router>
  );
}

export default App;
