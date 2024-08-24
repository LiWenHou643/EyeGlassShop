import axios from 'axios';
import Cookies from 'js-cookie';

const REST_API_BASE_URL = 'http://localhost:8080/api';

export const login = (username, password) =>
    axios.post(`${REST_API_BASE_URL}/login`, {
        username: username,
        password: password,
    });

export const register = (user) =>
    axios.post(`${REST_API_BASE_URL}/register`, user);

export const getCurrentUser = () =>
    axios.get(`${REST_API_BASE_URL}/user`, {
        headers: {
            Authorization: `Bearer ${Cookies.get('jwtToken')}`,
        },
    });
