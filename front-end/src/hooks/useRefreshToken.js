import { refreshToken } from '../api/apiAuth';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            console.log('refreshing..');
            const response = await refreshToken();

            if (response.code === 1006 || response.code === 1007) {
                throw new Error(response.data.message); // Provide a error message
            }

            setAuth((prev) => {
                return {
                    username: response.data.username,
                    role: response.data.role,
                    accessToken: response.data.accessToken,
                };
            });
            return response.data.accessToken;
        } catch (error) {
            console.log('error in useRefreshToken:', error);

            // If the refresh token is invalid, logout the user
            setAuth({});

            return;
        }
    };
    return refresh;
};

export default useRefreshToken;
