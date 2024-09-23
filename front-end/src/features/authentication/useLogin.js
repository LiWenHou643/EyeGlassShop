import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const location = useLocation();

    const { mutate: login, isLoading: isLoggingin } = useMutation({
        mutationFn: ({ username, password }) =>
            loginApi({ username, password }),
        onSuccess: (response) => {
            if (response?.data?.data.accessToken) {
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.data)
                );
                queryClient.setQueryData(['user'], response.data.data);
                const redirectPath = location.state?.from?.pathname || '/';
                navigate(redirectPath, { replace: true });
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
    return { login, isLoggingin };
}
