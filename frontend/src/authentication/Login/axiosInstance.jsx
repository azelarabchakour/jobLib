import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Change this to your backend URL
  timeout: 5000, // Adjust timeout as needed
});

// Function to set access token in headers
export const setAccessToken = (accessToken) => {
  if (accessToken) {
    axiosInstance.defaults.headers.common['Authorization'] = `JWT ${accessToken}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Function to get user information
export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/auth/users/me/');
    return response.data;
  } catch (error) {
    console.error('Error getting user information:', error);
    throw error;
  }
};

export default axiosInstance;
