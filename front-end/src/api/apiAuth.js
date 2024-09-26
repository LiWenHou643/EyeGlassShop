import axios from './axios';

export const login = async ({ username, password }) => {
    const response = await axios.post('/auth/login', {
        username,
        password,
    });
    return response.data;
};

export const register = async (user) => {
    const response = await axios.post('/auth/register', user);
    return response.data;
};

export const logout = async () => {
    localStorage.removeItem('user');

    const response = await axios.get('/auth/logout');

    window.location.href = '/login';
    return response.data;
};

export const refreshToken = async () => {
    const response = await axios.get('/auth/refresh');
    return response.data;
};
