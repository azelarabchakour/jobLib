import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

export default function Jobs() {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear any stored authentication token or user data
        localStorage.removeItem('accessToken'); // the token is stored in localStorage
        localStorage.removeItem('refreshToken');
        navigate('/'); // Navigate to login page
    };

    return (
        <div>
        <Button onClick={handleLogout}>logout</Button>
          Hello world Employee
        </div>
    );
  }