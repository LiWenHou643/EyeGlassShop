import api from './apiClient';

export const login = ({ username, password }) =>
    api.post('/auth/login', {
        username,
        password,
    });

export const register = (user) =>
    api.post('/auth/register', user).then((response) => response.data);

export const logout = () => {
    localStorage.removeItem('user');
    api.post('/auth/logout')
        .then((response) => {
            if (response.status === 200) {
                window.location.href = '/'; // Redirect or reload after logout
            }
        })
        .catch((error) => {
            console.error('Error logging out:', error);
        });
};

export const refreshToken = () =>
    api
        .post('/auth/refresh-token')
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
