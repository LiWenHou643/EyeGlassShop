import { useQuery } from '@tanstack/react-query';
import { getCart } from '../../api/apiCart';

export function useCart() {
    const { isLoading, isFetching, data, error } = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
        keepPreviousData: true, // Keep the previous data during refetch
        refetchOnWindowFocus: false,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    });

    return {
        isLoading,
        isFetching,
        data: data?.data ?? {},
        count: data?.data?.cartItems?.length ?? 0,
        error,
    };
}
