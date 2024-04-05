import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 5000, 
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
    const response = await axiosInstance.get('/auth/jwt/create/');
    return response.data;
} catch (error) {
    console.error('Error getting user information:', error);
    throw error;
}
};

export default axiosInstance;
