import { useQuery } from '@tanstack/react-query';
import { getCart } from '../../api/apiCart';

export function useCart() {
    console.log('fetching cart...');
    const { isLoading, isFetching, data, error } = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
        onSuccess: (res) => {
            console.log('res', res);
        },
        onError: (err) => {
            console.log('error', err);
        },
        keepPreviousData: true, // Keep the previous data during refetch
        refetchOnWindowFocus: false,
        retry: false,
    });

    return {
        isLoading,
        isFetching,
        data: data?.data ?? {},
        count: data?.data?.cartItems?.length ?? 0,
        error,
    };
}
