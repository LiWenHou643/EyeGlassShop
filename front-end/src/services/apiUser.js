import { jwtDecode } from 'jwt-decode';
import { privateApi } from './apiClient';

const isTokenExpired = (token) => {
    if (!token) return true;

    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = decodedToken.exp < currentTime;
    !isExpired
        ? console.log(
              'token will expire in: ',
              decodedToken.exp - currentTime,
              ' seconds'
          )
        : console.log(
              'token expired in ',
              decodedToken.exp - currentTime,
              ' seconds'
          );

    return decodedToken.exp < currentTime;
};

export const getUser = async () => {
    const userStored = localStorage.getItem('user') || null;

    if (userStored && userStored !== 'undefined') {
        const user = JSON.parse(userStored);
        const token = user?.accessToken;
        if (!isTokenExpired(token)) return user;
    }

    const data = await privateApi.get('/user');
    console.log(data.code);
};
