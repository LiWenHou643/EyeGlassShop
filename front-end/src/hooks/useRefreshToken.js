import { refreshToken } from '../api/apiAuth';
import { useAuth } from './useAuth';
import { useCartCtx } from './useCartCtx';

export const useRefreshToken = () => {
    const { setAuth, setPersist } = useAuth();
    const { setCart } = useCartCtx();
    const refresh = async () => {
        try {
            console.log('refreshing token...');
            const response = await refreshToken();
            console.log('token refresh:', response);

            const { code } = response;
            if (code === 1007 || code === 1008) {
                throw new Error(response.message); // Provide a error message
            }

            setAuth({
                accessToken: response.data.accessToken,
                username: response.data.username,
                role: response.data.role,
            });
            localStorage.setItem(
                'auth',
                JSON.stringify({
                    accessToken: response.data.accessToken,
                    username: response.data.username,
                    role: response.data.role,
                })
            );

            return response.data.accessToken;
        } catch (error) {
            console.log(error);
            localStorage.removeItem('auth');
            localStorage.removeItem('cart');
            localStorage.removeItem('persist');
            setCart([]);
            setAuth({});
            setPersist(false);

            return;
        }
    };

    return refresh;
};
