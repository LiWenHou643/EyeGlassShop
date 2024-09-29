import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { logout as logoutApi } from '../../api/apiAuth';
import useAuth from '../../hooks/useAuth';

export function useLogout() {
    const { setAuth } = useAuth();
    const { mutate: logout, isLoading: isLoggingout } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            setAuth({});
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.message || 'An unknown error occurred';

            toast.error(errorMessage);
        },
    });
    return { logout, isLoggingout };
}
