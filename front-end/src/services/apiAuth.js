import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api';

export const login = ({ username, password }) =>
    axios.post(
        `${REST_API_BASE_URL}/login`,
        {
            username,
            password,
        },
        {
            withCredentials: true,
        }
    );
// .catch((error) => {
//     throw new Error(
//         error.response?.data?.message || 'An error occurred'
//     );
// });

export const getCurrentUser = () => {
    try {
        const user = localStorage.getItem('user');
        if (user !== 'undefined') {
            return JSON.parse(user);
        }
        const response = axios.get(`${REST_API_BASE_URL}/user`, {
            withCredentials: true,
        });
        console.log('response axios', response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data || null; // Ensure we return null if no data is returned
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null; // Return null on error to avoid returning undefined
    }
};

export const register = (user) =>
    axios.post(`${REST_API_BASE_URL}/register`, user, {
        withCredentials: true,
    });

export const logout = () =>
    axios.get(`${REST_API_BASE_URL}/logout`, {
        withCredentials: true,
    });

export const refesh = () =>
    axios.get(`${REST_API_BASE_URL}/refresh`, {
        withCredentials: true,
    });
