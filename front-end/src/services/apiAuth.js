import axios from 'axios';
import Cookies from 'js-cookie';

const REST_API_BASE_URL = 'http://localhost:8080/api';

const getToken = () => {
    return Cookies.get('token');
};

export const login = ({ username, password }) =>
    axios
        .post(
            `${REST_API_BASE_URL}/login`,
            {
                username,
                password,
            },
            {
                withCredentials: true,
            }
        )
        .catch((error) => {
            throw new Error(
                error.response?.data?.message || 'An error occurred'
            );
        });

export const getCurrentUser = () => {
    const token = getToken();
    if (!token) return null;

    axios.get(`${REST_API_BASE_URL}/user`, {
        headers: {
            Authorization: `Bearer ${getToken()}`, // Replace with the actual token or use your auth method
        },
        withCredentials: true,
    });
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
