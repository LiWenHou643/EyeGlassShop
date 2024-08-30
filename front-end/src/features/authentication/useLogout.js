import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { logout as logoutApi } from '../../services/apiAuth';

export function useLogout() {
    const { mutate: logout, isLoading: isLoggingout } = useMutation({
        mutationFn: logoutApi,
        onError: (error) => {
            const errorMessage =
                error.response?.data?.message || 'An unknown error occurred';

            toast.error(errorMessage);
        },
    });
    return { logout, isLoggingout };
}
