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
import HomePage from "./HomePage2/HomePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<JobDetails/>} />
        <Route path="/" element={<HomePage/>} />
        {/* <Route path="/test" element={<JobDetails/>} /> */}
        <Route path="/test" element={<NavbarComponent1 />} />
        <Route path="/" element={<HomePage/>} />
        {/* authentication routes  */}

        {/* choose the user  */}
        <Route path="/chooseRole" element={<ChooseRole/>} />
        {/* employer  */}
        <Route path="/jobs" element={<Jobs/>} />
        <Route path="/employer/:jobId/applications" element={<JobDetails />} />

        {/* employee  */}
        <Route path="/matchedJobs" element={<MatchedJobs/>} />
        {/* shared  */}
        <Route path="/profile" element={<Profile/>} />
        <Route path="/editProfile" element={<EditProfile/>} />
      </Routes>
    </Router>
  );
}

export default App;