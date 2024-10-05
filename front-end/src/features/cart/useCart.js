import { useQuery } from '@tanstack/react-query';

export function useCart() {
    const getCart = async () => {};

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
