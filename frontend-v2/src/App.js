import HomePage from "./HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Jobs from "./Employer/Jobs";
import MatchedJobs from "./Employee/MatchedJobs";
import ChooseRole from "./HomePage/ChooseRole";
import Profile from "./Profile/Profile";
import JobPostingDetails from "./Components/JobPostingDetails";
import EditProfile from "./Profile/EditProfile";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
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