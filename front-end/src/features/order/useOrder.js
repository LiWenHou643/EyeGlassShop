import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
export const useOrder = (orderId) => {
    const axiosPrivate = useAxiosPrivate();

    const fetchOrder = async (orderId) => {
        const { data } = await axiosPrivate.get(`/orders/${orderId}`);
        return data.data;
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => fetchOrder(orderId),
        refetchOnWindowFocus: false,
    });

    return {
        order: data,
        isFetching: isLoading,
        error,
    };
};
