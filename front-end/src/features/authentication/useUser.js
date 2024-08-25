import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

function useUser() {
    const { isLoading, data: user } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
        onError: (error) => {
            console.error('Error fetching user data:', error);
            // If an error occurs, redirect to the login page
            navigate('/login');
        },
    });

    return { isLoading, user };
}

export default useUser;
