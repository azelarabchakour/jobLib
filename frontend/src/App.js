import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './authentication/Login/login.jsx';
import Signup from './authentication/SignUp/signup.jsx';
import Profile from './authentication/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
