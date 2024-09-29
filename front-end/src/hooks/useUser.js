import useAxiosPrivate from './useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
    const axiosPrivate = useAxiosPrivate();

    const getUser = async () => {
        try {
            const response = await axiosPrivate.get('/user');
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    };

    const { isLoading, data, error } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: false,
    });

    return { isLoading, data, error };
};
