import { refreshToken } from '../api/apiAuth';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        console.log('sending refresh request...');
        try {
            const response = await refreshToken();

            if (response.code === 1006 || response.code === 1007) {
                throw new Error(response.data.message); // Provide a error message
            }

            setAuth((prev) => {
                console.log('prev in useRefreshToken:', prev);
                console.log(
                    'newtoken in useRefreshToken:',
                    response.data.accessToken
                );
                return {
                    ...prev,
                    accessToken: response.data.accessToken,
                };
            });
            return response.data.accessToken;
        } catch (error) {
            console.log('error in useRefreshToken:', error);
            return;
        }
    };
    return refresh;
};

export default useRefreshToken;
