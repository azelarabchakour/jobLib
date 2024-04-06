import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './authentication/Login/login.jsx';
import Logout from './authentication/Logout/logout.jsx';
import Signup from './authentication/SignUp/signup.jsx';
import ForgetPass from './authentication/ResetPassword/ForgetPassword.jsx';
import ResetPass from './authentication/ResetPassword/ResetPassword.jsx';
import HomePage from './homepage/homePage.jsx';
import EmployerPost from './Employer/EmployerPost.jsx';
import EmployerGetJobs from './Employer/EmployerGetJobs.jsx';
import EditJob from './Employer/EditJob.jsx';
import SwitchUser from './SwitchUser/SwitchUser.jsx';
import UserInfo from './UserInfo/UserInfo.jsx';
import UploadCv from './Employee/UploadCv/UploadCv.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        {/* authentication routes  */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPass/>} />
        <Route path="/reset-password" element={<ResetPass/>} />
        {/* choose the user  */}
        <Route path="/switch-user" element={<SwitchUser />} />
        {/* employer  */}
        <Route path="/employer/employer-post"  element={<EmployerPost/>} />
        <Route path="/employer/employer-old-jobs"  element={<EmployerGetJobs/>} />
        <Route path="/employer/edit-job/:jobId" element={<EditJob />} />
        {/* <Route path="/employer/applications" element={<Applications />} /> */}
        {/* employee  */}
        <Route path="/employee/upload-cv" element={<UploadCv/>}/>
        {/* shared  */}
        <Route path="/user-info" element={<UserInfo/>} />
      </Routes>
    </Router>
  );
}

export default App;
