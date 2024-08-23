import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api';

export const login = (username, password) =>
    axios.post(`${REST_API_BASE_URL}/login`, {
        username: username,
        password: password,
    });
