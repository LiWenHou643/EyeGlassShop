import axios from 'axios';
import { refreshToken } from './apiAuth';

const REST_API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: REST_API_BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('user')?.accessToken; // Function to get token from cookies
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            if (error.response.data.message === 'Invalid credentials') {
                // Handle invalid credentials case
                // Show an error message to the user
            } else {
                try {
                    const user = await refreshToken();
                    if (user) {
                        localStorage.setItem('user', JSON.stringify(user));
                    }

                    const originalRequest = error.config;
                    const newToken = user?.accessToken;
                    originalRequest.headers[
                        'Authorization'
                    ] = `Bearer ${newToken}`;
                    return axios(originalRequest);
                } catch (refreshError) {
                    console.error('Failed to refresh token:', refreshError);
                    localStorage.removeItem('user');
                    window.location.href = '/login'; // Redirect to login
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
