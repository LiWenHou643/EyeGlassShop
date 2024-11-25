import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
export const useFindOrderByUserId = (useId) => {
    const axiosPrivate = useAxiosPrivate();

    const fetchOrder = async () => {
        const { data } = await axiosPrivate.get(`/orders`);
        return data.data;
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['order'],
        queryFn: fetchOrder,
        refetchOnWindowFocus: false,
    });

    return {
        orders: data,
        isLoading,
        error,
    };
};

export const useFindOrderByOrderId = (orderId) => {
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
        isLoading,
        error,
    };
};
