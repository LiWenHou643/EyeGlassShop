import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../services/apiUser';

function useUser() {
    const { isLoading, data: user } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
    });

    return {
        isLoading,
        username: user?.username,
        role: user?.role,
        isAuthenticated: user?.accessToken ? true : false,
    };
}

export default useUser;
