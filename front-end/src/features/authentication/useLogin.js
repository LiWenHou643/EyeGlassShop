import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginAccount } from '../../services/AuthApi';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const location = useLocation();

    const { mutate: login, isLoading: isLoggingin } = useMutation({
        mutationFn: (data) => loginAccount(data.email, data.pwd),
        onSuccess: (response) => {
            // Store JWT token from the response
            localStorage.setItem('jwtToken', response.data.jwtToken);

            // Set the user in the context
            setAuth({
                token: response.data.jwtToken,
                user: response.data.user,
            });

            queryClient.invalidateQueries({
                queryKey: ['user'],
            });
            toast.success('User logged in successfully');

            // Redirect to the home page or the page the user was trying to access
            const redirectPath = location.state?.from?.pathname || '/';
            navigate(redirectPath);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return { login, isLoggingin };
}
