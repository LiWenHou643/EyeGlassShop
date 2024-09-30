import { useQuery } from '@tanstack/react-query';
import { getCart } from '../../api/apiCart';

export function useCart() {
    console.log('fetching cart...');
    const { isLoading, isFetching, data, error } = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
        onSuccess: (res) => {
            console.log('onSuccess', res);
        },
        onError: (err) => {
            console.log('onError', err);
        },
        keepPreviousData: true, // Keep the previous data during refetch
        refetchOnWindowFocus: false,
        retry: false,
    });

    return {
        isLoading,
        isFetching,
        data: data?.cartItems ?? {},
        count: data?.cartItems?.length ?? 0,
        error,
    };
}
