import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

function useUser() {
    const { isLoading, data: user } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
        retry: 0,
        refetchOnWindowFocus: false,
        staleTime: 2000,
    });

    return { isLoading, user, isAuthenticated: user?.isAuthenticated };
}

export default useUser;
