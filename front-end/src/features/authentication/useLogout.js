import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { logout as logoutApi } from '../../api/apiAuth';
import { useAuth } from '../../hooks/useAuth';
import { useCartCtx } from '../../hooks/useCartCtx';

export function useLogout() {
    const { setAuth, setPersist } = useAuth();
    const { setCartCount, setCart } = useCartCtx();

    const { mutate: logout, isLoading: isLoggingout } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            localStorage.removeItem('auth');
            localStorage.removeItem('cart');
            localStorage.removeItem('cartCount');
            localStorage.removeItem('persist');
            setAuth({});
            setPersist(false);
            setCartCount(0);
            setCart([]);
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.message || 'An unknown error occurred';

            toast.error(errorMessage);
        },
    });
    return { logout, isLoggingout };
}
