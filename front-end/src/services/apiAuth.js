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

export const getCurrentUser = () => {
    try {
        const user = localStorage.getItem('user');
        if (user !== 'undefined') {
            return JSON.parse(user);
        }
        const response = axios.get(
            `${REST_API_BASE_URL}/user`,
            {},
            {
                withCredentials: true,
            }
        );
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

export const logout = () => {
    localStorage.removeItem('user');
    axios
        .post(`${REST_API_BASE_URL}/logout`, {}, { withCredentials: true })
        .then((response) => {
            if (response.status === 200) {
                window.location.href = '/'; // Redirect or reload after logout
            }
        });
};

export const refesh = () =>
    axios.get(`${REST_API_BASE_URL}/refresh`, {
        withCredentials: true,
    });

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { status } = error.response || {};

        if (status === 401) {
            // If unauthorized, attempt to refresh the token
            try {
                await refesh();
                // Retry the original request
                return axios.request(error.config);
            } catch (refreshError) {
                // Handle refresh token failure (e.g., redirect to login)
                console.error('Refresh token failed:', refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
