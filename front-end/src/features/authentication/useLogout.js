import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { logout as logoutApi } from '../../services/apiAuth';

export function useLogout() {
    const { mutate: logout, isLoading: isLoggingout } = useMutation({
        mutationFn: logoutApi,
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return { logout, isLoggingout };
}
