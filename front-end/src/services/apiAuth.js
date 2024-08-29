import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/auth';

const axiosAuth = axios.create({
    baseURL: REST_API_BASE_URL,
    withCredentials: true,
});

export const login = ({ username, password }) =>
    axiosAuth.post('/login', {
        username,
        password,
    });

export const getCurrentUser = () => {
    try {
        const user = localStorage.getItem('user');
        if (user !== 'undefined') {
            return JSON.parse(user);
        }
        const response = axiosAuth.get('/user');
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data || null; // Ensure we return null if no data is returned
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null; // Return null on error to avoid returning undefined
    }
};

export const register = (user) => axiosAuth.post('/register', user);

export const logout = () => {
    localStorage.removeItem('user');
    axiosAuth.post('/logout').then((response) => {
        if (response.status === 200) {
            window.location.href = '/'; // Redirect or reload after logout
        }
    });
};

export const refreshToken = () => axiosAuth.get('/refresh-token');

// axiosAuth.interceptors.response.use(
//     (response) => {
//         // Return the response directly if it's successful
//         return response;
//     },
//     async (error) => {
//         const { status } = error.response || {};

//         if (status === 401) {
//             // If unauthorized, attempt to refresh the token
//             try {
//                 await refreshToken(); // Define this function to refresh your token

//                 // Retry the original request with the new token
//                 return axiosAuth.request(error.config);
//             } catch (refreshError) {
//                 // Handle refresh token failure (e.g., redirect to login)
//                 console.error('Refresh token failed:', refreshError);
//                 return Promise.reject(refreshError);
//             }
//         }

//         // If the error is not a 401, reject it as usual
//         return Promise.reject(error);
//     }
// );

export default axiosAuth;
