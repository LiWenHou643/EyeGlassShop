import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const location = useLocation();

    const { mutate: login, isLoading: isLoggingin } = useMutation({
        mutationFn: ({ username, password }) =>
            loginApi({ username, password }),
        onSuccess: (response) => {
            if (response.data.isAuthenticated) {
                localStorage.setItem('user', JSON.stringify(response.data));
                queryClient.setQueryData(['user'], response.data);
                const redirectPath = location.state?.from?.pathname || '/';
                navigate(redirectPath, { replace: true });
            }
            return null;
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            toast.error('Invalid username or password!');
                            break;
                        case 500:
                            toast.error(
                                'Internal server error. Please try again later.'
                            );
                            break;
                        default:
                            toast.error(
                                'An error occurred during registration.'
                            );
                    }
                } else {
                    toast.error(
                        'No response from server. Please check your network connection.'
                    );
                }
            } else {
                toast.error('Unexpected error occurred.');
            }
        },
    });
    return { login, isLoggingin };
}
