import axios from 'axios';
import { refreshToken } from './apiAuth';

const REST_API_BASE_URL = 'http://localhost:8080';

const privateApi = axios.create({
    baseURL: REST_API_BASE_URL,
    withCredentials: true,
});

const publicApi = axios.create({
    baseURL: `${REST_API_BASE_URL}/public`,
    withCredentials: true,
});

privateApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('user')?.accessToken;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Add a response interceptor to handle 401 errors
privateApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.code === 1003 || error.response?.code === 1004) {
            try {
                const user = await refreshToken();
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                }

                const originalRequest = error.config;
                const newToken = user?.accessToken;
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                localStorage.removeItem('user');
                window.location.href = '/login'; // Redirect to login
            }
        }
        return Promise.reject(error);
    }
);

export { privateApi, publicApi };
