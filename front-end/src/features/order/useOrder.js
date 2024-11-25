import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
export const useOrder = (useId) => {
    const axiosPrivate = useAxiosPrivate();

    const fetchOrder = async (useId) => {
        const { data } = await axiosPrivate.get(`/orders/${useId}`);
        return data.data;
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['order', useId],
        queryFn: () => fetchOrder(useId),
        refetchOnWindowFocus: false,
    });

    return {
        orders: data,
        isLoading,
        error,
    };
};
