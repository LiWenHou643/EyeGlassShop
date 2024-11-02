import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
export const useOrders = ({ page }) => {
    const axiosPrivate = useAxiosPrivate();
    const fetchOrders = async () => {
        console.log('fetching orders', page, 12);
        const { data } = await axiosPrivate.get(`admin/orders`, {
            params: { page: page, size: 12 },
        });
        console.log(data.data);
        return data.data;
    };

    const { data, isLoading, error } = useQuery(['orders', page], fetchOrders, {
        enabled: !!axiosPrivate,
        refetchOnWindowFocus: false,
    });

    return {
        orders: data?.content,
        totalPage: data?.totalPages,
        isLoading,
        error,
    };
};
