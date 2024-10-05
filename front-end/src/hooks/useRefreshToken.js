import { refreshToken } from '../api/apiAuth';
import { useAuth } from './useAuth';

export const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            console.log('refreshing token...');
            const response = await refreshToken();

            const { code } = response;
            if (code === 1007 || code === 1008) {
                throw new Error(response.message); // Provide a error message
            }

            setAuth({
                accessToken: response.data.accessToken,
                username: response.data.username,
                role: response.data.role,
            });

            return response.data.accessToken;
        } catch (error) {
            console.log(error);
            // If the refresh token is invalid, logout the user
            setAuth({});

            return;
        }
    };

    return refresh;
};
