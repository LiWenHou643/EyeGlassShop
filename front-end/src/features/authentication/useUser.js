import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../services/apiUser';

function useUser() {
    const { isLoading, data: user = null } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        staleTime: 1000 * 10, // 10 seconds
    });

    return {
        isLoading,
        username: user?.username || '',
        role: user?.role || '',
        isAuthenticated: !!user?.accessToken,
    };
}
export default useUser;
