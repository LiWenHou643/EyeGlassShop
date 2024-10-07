import { useAxiosPrivate } from './useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
    const axiosPrivate = useAxiosPrivate();

    const getUser = async () => {
        const response = await axiosPrivate.get('/user');
        return response.data;
    };

    const { isLoading, isFetching, data, error } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        onSuccess: () => {
            console.log('User data fetched successfully');
        },
        staleTime: 1000 * 5, // 5 seconds
        retry: false, // Disable retry on error
        refetchOnWindowFocus: false, // Prevent refetch when window regains focus
    });

    return { isLoading, isFetching, data: data?.data || data || {}, error };
};
