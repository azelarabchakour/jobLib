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
function App() {
  return (
    <Router>
      {/* <NavbarComponent1></NavbarComponent1> */}
      <Routes>
        <Route path="/test" element={<TestD/>} />
        {/* <Route path="/test" element={<HomePage />} /> */}
        <Route path="/" element={<HomePage/>} />
        {/* authentication routes  */}        

        {/* employer  */}
        <Route path="/jobs" element={<Jobs/>} />
        <Route path="/employer/:jobId/details" element={<JobDetails />} />
        <Route path="/employer/:jobId/jobDetails" element={<JobPostingDetails />} />
        <Route path="/employer/:jobId/applicants" element={<JobApplicants />} />

        {/* employee  */}
        <Route path="/matchedJobs" element={<MatchedJobs/>} />

        {/* shared  */}
        <Route path="/chooseRole" element={<ChooseRole/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/editProfile" element={<EditProfile/>} />
      </Routes>
    </Router>
  );
}

export default App;