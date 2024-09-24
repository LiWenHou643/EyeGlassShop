import { privateApi as api } from './apiClient';

export const login = async ({ username, password }) => {
    const response = await api.post('/auth/login', {
        username,
        password,
    });
    return response.data;
};

export const register = async (user) => {
    const response = await api.post('/auth/register', user);
    return response.data;
};

export const logout = async () => {
    localStorage.removeItem('user');

    const response = await api.post('/auth/logout');

    window.location.href = '/login';
    return response.data;
};

export const refreshToken = async () => {
    const response = await api.post('/auth/refresh-token');
    return response?.data || null;
};
