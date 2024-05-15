import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Jobs from "./Employer/Jobs";
import MatchedJobs from "./Employee/MatchedJobs";
import ChooseRole from "./HomePage/ChooseRole";
import Profile from "./Profile/Profile";
import EditProfile from "./Profile/EditProfile";
import JobApplication from "./Components/JobApplication";
import JobPostingDetails from "./Employer/JobPostingDetails";
import JobDetails from "./Employer/JobDetails";
import NavbarComponent from "./Components/NavbarComponent";
import NavbarComponent1 from "./Components/NavBarComponent1"
import HomePage from "./HomePage/HomePage";
import StepperWithContent from "./Components/StepperWithContent"
import JobApplicants from "./Employer/JobApplicants";
import TabsComponent from './Components/TabsComponent';
import TestD from './Components/test';
import CreateJob from './Employer/CreateJob';
import UploadCv from './Employee/UploadCv.jsx';
import Application from './Employee/application.jsx';
import FinalNavBar from './Components/FinalNavbar.jsx';
import SignInDialog from './Components/SignIn.js';
import AuthEmployee from './Authentication/AuthEmployee.jsx';
import AuthEmployer from './Authentication/AuthEmployer.jsx';
import SignIn from './Authentication/SignIn.jsx';
import Applications from './Employee/Applications.jsx';
import TestJD from './Employee/TestJD.jsx';
import EmployeeNavbar from './Employee/EmployeeNavbar.jsx';
import TestJob from './Employer/TestJob.jsx';
function App() {
  return (
    <Router>
      {/* <NavbarComponent1></NavbarComponent1> */}
      <Routes>

        {/* shared  */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/test" element={<SignIn/>} />

        <Route path="/chooseRole" element={<ChooseRole/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/editProfile" element={<EditProfile/>} />
        
        {/* employer  */}
        <Route path='/employer/createJob' element={<CreateJob />} />
        <Route path="/employer/jobs" element={<Jobs/>} />
        <Route path="/employer/:jobId/details" element={<JobDetails />} />
        <Route path="/employer/:jobId/jobDetails" element={<JobPostingDetails />} />
        <Route path="/employer/testJob" element={<TestJob />} />

        {/* employee  */}
        <Route path="/employee/matchedJobs" element={<MatchedJobs/>} />
        <Route path="/employee/uploadCv" element={<UploadCv/>} />
        <Route path="/employee/applications" element={<Applications/>} />
        <Route path="/employee/testJD" element={<TestJD/>} />
        

      </Routes>
    </Router>
  );
}

export default App;