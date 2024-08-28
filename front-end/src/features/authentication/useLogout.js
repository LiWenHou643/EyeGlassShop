import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logout as logoutApi } from '../../services/apiAuth';

export function useLogout() {
    const navigate = useNavigate();

    const { mutate: logout, isLoading: isLoggingout } = useMutation({
        mutationFn: logoutApi,
        onSuccess: (response) => {
            // Show a success message
            toast.success('Logged out successfully!');

            // Redirect to the login page
            navigate('/login');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return { logout, isLoggingout };
}
