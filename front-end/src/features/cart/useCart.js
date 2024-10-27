import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

export function useCart() {
    const axiosPrivate = useAxiosPrivate();

    const getCart = async () => {
        const response = await axiosPrivate.get('user/cart');
        console.log('response', response.data.data);
        return response.data.data;
    };

    const { isLoading, isFetching, data, error } = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
        onError: (err) => {
            console.log('onError', err);
        },
        onSuccess: (data) => {
            localStorage.setItem('cart', JSON.stringify(data));
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: false,
    });

    return {
        isLoading,
        isFetching,
        cartId: data?.cartId ?? null,
        data: data?.cartItems ?? {},
        count: data?.cartItems?.length ?? 0,
        error,
    };
}
