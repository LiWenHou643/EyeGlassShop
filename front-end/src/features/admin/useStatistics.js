import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

export const useCountOrderRevenue = () => {
    const axiosPrivate = useAxiosPrivate();

    const fetch = async () => {
        const { data } = await axiosPrivate.get('/admin/monthly-totals');
        return data.data;
    };

    const { data: orderRevenue, isLoading: isLoadingOrderRevenue } = useQuery({
        queryKey: ['order_revenue'],
        queryFn: fetch,
    });
    return {
        isLoadingOrderRevenue,
        orderRevenue,
    };
};

export const useTopSellers = () => {
    const axiosPrivate = useAxiosPrivate();

    const fetch = async () => {
        const { data } = await axiosPrivate.get('/admin/top-sellers');
        return data.data;
    };

    const { data: topSellers, isLoading: isLoadingTopSellers } = useQuery({
        queryKey: ['top_seller'],
        queryFn: fetch,
    });
    return {
        topSellers,
        isLoadingTopSellers,
    };
};
