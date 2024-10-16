import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

export function useAddToCart() {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ productId, cartId, quantity }) => {
            axiosPrivate.post(`user/cart/add`, null, {
                params: {
                    cartId,
                    productId,
                    quantity,
                },
            });
        },
        onSuccess: (res) => {
            console.log(res);
            queryClient.invalidateQueries('cart');
        },
        onError: (error) => {
            console.log(error);
        },
    });

    return { addToCart: mutate, isAdding: isLoading };
}
