import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../api/apiAuth';
import { useAuth } from '../../hooks/useAuth';

export function useLogin() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth } = useAuth();
    const from = location.state?.from?.pathname || '/';

    const { mutate: login, isLoading: isLoggingin } = useMutation({
        mutationFn: ({ username, password, persistent }) =>
            loginApi({ username, password, persistent }),
        onSuccess: (response) => {
            if (response.code !== 1000) throw new Error(response.message);

            if (response.data.accessToken) {
                const { accessToken, username, role } = response.data;
                setAuth({ accessToken, username, role });
                localStorage.setItem(
                    'auth',
                    JSON.stringify({ accessToken, username, role })
                );
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
