import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api';

export const login = (username, password) =>
    axios.post(
        `${REST_API_BASE_URL}/login`,
        {
            username: username,
            password: password,
        },
        {
            withCredentials: true,
        }
    );

export const register = (user) =>
    axios.post(`${REST_API_BASE_URL}/register`, user, {
        withCredentials: true,
    });

export const getCurrentUser = () =>
    axios.get(`${REST_API_BASE_URL}/user`, {
        withCredentials: true,
    });

export const refesh = () =>
    axios.get(`${REST_API_BASE_URL}/refresh`, {
        withCredentials: true,
    });
