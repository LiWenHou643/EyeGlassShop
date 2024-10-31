import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
export const useOrders = () => {
    const axiosPrivate = useAxiosPrivate();
    const fetch = async () => {
        console.log('fetching orders');
        const { data } = await axiosPrivate.get(`/orders/list`);
        console.log('orders', data);
        return data.data;
    };

    const {
        data: orders,
        isLoading,
        error,
    } = useQuery(['orders'], () => fetch(), {
        enabled: !!axiosPrivate,
        refetchOnWindowFocus: false,
    });

    return { orders, isLoading, error };
};
