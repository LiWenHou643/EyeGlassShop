import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api';

export const register = (user) =>
    axios.post(`${REST_API_BASE_URL}/register`, user);

export const login = (user) => axios.post(`${REST_API_BASE_URL}/login`, user);
