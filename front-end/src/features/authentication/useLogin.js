import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export function useLogin() {
    const navigate = useNavigate();
    const location = useLocation();

    const setJwtTokenCookie = (token) => {
        // Calculate expiration time (current time + 30 minutes)
        const expirationTime = new Date(new Date().getTime() + 30 * 60 * 1000);

        // Set the cookie with the JWT token and expiration time
        Cookies.set('jwtToken', token, { expires: expirationTime });
    };

    const { mutate: login, isLoading: isLoggingin } = useMutation({
        mutationFn: (data) => loginApi(data.email, data.pwd),
        onSuccess: (response) => {
            // Store JWT token from the response
            setJwtTokenCookie(response.data.jwtToken);

            // Show a success message
            toast.success('Logged in successfully!');

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
