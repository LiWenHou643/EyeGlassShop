import { useQuery } from '@tanstack/react-query';
import { getCart } from '../../services/apiCart';

export function useCart() {
    const { isLoading, isFetching, data, error } = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
        keepPreviousData: true, // Keep the previous data during refetch
        refetchOnWindowFocus: false,
    });

    return {
        isLoading,
        isFetching,
        data: data?.data ?? {},
        count: data?.data?.cartItems?.length ?? 0,
        error,
    };
}
