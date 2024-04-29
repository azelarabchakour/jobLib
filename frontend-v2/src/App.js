import HomePage2 from "./HomePage2/HomePage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Jobs from "./Employer/Jobs";
import MatchedJobs from "./Employee/MatchedJobs";
import ChooseRole from "./HomePage/ChooseRole";
import Profile from "./Profile/Profile";
import EditProfile from "./Profile/EditProfile";
import JobApplication from "./Components/JobApplication";
import JobDetails from "./Employer/JobDetails";
import JobPostingDetails from "./Employer/JobPostingDetails";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<JobDetails/>} />
        <Route path="/" element={<HomePage2/>} />
        {/* authentication routes  */}

        {/* choose the user  */}
        <Route path="/chooseRole" element={<ChooseRole/>} />
        {/* employer  */}
        <Route path="/jobs" element={<Jobs/>} />
        <Route path="/employer/:jobId/applications" element={<JobPostingDetails />} />

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