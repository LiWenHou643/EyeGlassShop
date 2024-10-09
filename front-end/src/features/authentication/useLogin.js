import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../api/apiAuth';
import { useAuth } from '../../hooks/useAuth';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useCartCtx } from '../../hooks/useCartCtx';

export function useLogin() {
    const { setAuth } = useAuth();
    const { setCartCount, setCart } = useCartCtx();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const axiosPrivate = useAxiosPrivate();

    const getCart = async () => {
        const response = await axiosPrivate.get('user/cart');
        return response.data;
    };

    const queryClient = useQueryClient();
    const { mutate: login, isLoading: isLoggingin } = useMutation({
        mutationFn: ({ username, password, persistent }) =>
            loginApi({ username, password, persistent }),
        onSuccess: async (response) => {
            if (response.code !== 1000) throw new Error(response.message);

            console.log('login response', response.data);
            if (response.data.accessToken) {
                const { accessToken, username, role } = response.data;
                queryClient.setQueryData(['auth'], {
                    accessToken,
                    username,
                    role,
                });
                setAuth({ accessToken, username, role });
                localStorage.setItem(
                    'auth',
                    JSON.stringify({ accessToken, username, role })
                );

                const cart = await getCart();
                const cartCount = cart.data.cartItems.length;
                const cartItems = cart.data.cartItems;

                localStorage.setItem('cartCount', cartCount);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                setCartCount(cartCount);
                setCart(cartItems);

                navigate(from, { replace: true });
            }
            return null;
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                'An unknown error occurred';

            toast.error(errorMessage);
        },
    });

    return {
        login,
        isLoggingin,
    };
}
