import axios from 'axios';
import { refreshToken } from './apiAuth';

const REST_API_BASE_URL = 'http://localhost:8080';

const privateApi = axios.create({
    baseURL: REST_API_BASE_URL,
    withCredentials: true,
});

const publicApi = axios.create({
    baseURL: `${REST_API_BASE_URL}/public`,
});

privateApi.interceptors.request.use((config) => {
    let user = localStorage.getItem('user');
    if (user && user !== 'undefined') {
        user = JSON.parse(user);
    } else {
        user = null;
    }
    const token = user?.accessToken;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Add a response interceptor to handle 401 errors
privateApi.interceptors.response.use(
    async (response) => {
        const data = response.data;
        const code = data.code;

        if (code === 1005 || code === 1006) {
            const newToken = await refreshToken();
            if (newToken) {
                console.log('newToken:', newToken);
                const originalRequest = response.config;
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return privateApi(originalRequest);
            }
        }
        return response.data;
    },
    async (error) => {
        const response = error.response;
        const data = response.data;
        const code = data.code;

        if (code === 1005 || code === 1006) {
            const auth = await refreshToken();
            const newToken = auth.accessToken;
            if (auth && newToken) {
                console.log('newToken:', newToken);
                const originalRequest = error.config;
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return privateApi(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export { privateApi, publicApi };
