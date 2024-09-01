import { jwtDecode } from 'jwt-decode';
import { refreshToken } from './apiAuth';

const isTokenExpired = (token) => {
    if (!token) return true;

    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    console.log(decodedToken.exp - currentTime, 'seconds left');

    return decodedToken.exp < currentTime;
};

export const getUser = async () => {
    let user = null;
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
        try {
            user = JSON.parse(storedUser);
        } catch (error) {
            console.error('Failed to parse user JSON:', error);
            localStorage.removeItem('user');
            return null;
        }
    }

    const token = user?.accessToken;

    if (user && user !== 'undefined') {
        if (isTokenExpired(token)) {
            try {
                const user = await refreshToken();
                localStorage.setItem('user', JSON.stringify(user));
            } catch (error) {
                console.error('Failed to refresh token:', error);
                localStorage.removeItem('user');
                return null;
            }
        }
        return user;
    }
    return null;
};
