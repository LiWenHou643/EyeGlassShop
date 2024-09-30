import { refreshToken } from '../api/apiAuth';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            console.log('refreshing...');
            const response = await refreshToken();
            console.log('response', response);

            const { code } = response;
            if (code === 1007 || code === 1008) {
                throw new Error(response.message); // Provide a error message
            }

            console.log('refreshed', response.data.accessToken);
            setAuth((prev) => {
                return {
                    username: response.data.username,
                    role: response.data.role,
                    accessToken: response.data.accessToken,
                };
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

export default useRefreshToken;
