import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './authentication/Login/login.jsx';
import Logout from './authentication/logout/logout.jsx';
import Signup from './authentication/SignUp/signup.jsx';
import ForgetPass from './authentication/ResetPassword/ForgetPassword.jsx';
import ResetPass from './authentication/ResetPassword/ResetPassword.jsx';
import HomePage from './homepage/homePage.jsx';
import EmployerPost from './Employer/EmployerPost.jsx';
import EmployerGetJobs from './Employer/EmployerGetJobs.jsx';
import EditJob from './Employer/EditJob.jsx';
import SwitchUser from './SwitchUser/SwitchUser.jsx';
import UserInfo from './UserInfo/UserInfo.jsx';
import EditUserInfo from './UserInfo/EditUserInfo.jsx';
import UploadCv from './Employee/UploadCv/UploadCv.jsx';
import MatchedJobs from './Employee/MatchedJobs/MatchedJobs.jsx';
import EmployeeApplications from './Employee/EmployeeApplications/EmployeeApplications.jsx';
import EmployerApplications from './Employer/EmployerApplications/EmployerApplications.jsx';



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
        <Route path="/employer"  element={<EmployerPost/>} />
        <Route path="/employer/employer-post"  element={<EmployerPost/>} />
        <Route path="/employer/employer-old-jobs"  element={<EmployerGetJobs/>} />
        <Route path="/employer/edit-job/:jobId" element={<EditJob />} />
        <Route path="/employer/:jobId/applications" element={<EmployerApplications />} />
        {/* employee  */}
        <Route path="/employee" element={<UploadCv/>}/>
        <Route path="/employee/upload-cv" element={<UploadCv/>}/>
        <Route path="/employee/matched-jobs" element={<MatchedJobs/>}/>
        <Route path='/employee/applications'  element={<EmployeeApplications/>}/>
        {/* shared  */}
        <Route path="/user-info" element={<UserInfo/>} />
        <Route path="/edit-user-info" element={<EditUserInfo/>} />
      </Routes>
    </Router>
  );
}

export default App;
