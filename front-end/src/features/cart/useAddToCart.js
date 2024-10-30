import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

export function useAddToCart() {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ cartId, productId, quantity }) => {
            console.log({ cartId, productId, quantity });
            return axiosPrivate.post(`user/cart/add`, null, {
                params: {
                    cartId: cartId,
                    productId: productId,
                    quantity: quantity,
                },
            });
        },
        onMutate: async ({ cartId, productId, quantity }) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(['cart']);

            // Snapshot the previous value
            const previousCart = queryClient.getQueryData(['cart']);

            // Optimistically update to the new value
            queryClient.setQueryData(['cart'], (old) => {
                if (!old) return; // If no old data, return nothing
                const updatedItems = old.cartItems.map((item) => {
                    if (item.productId === productId) {
                        return {
                            ...item,
                            quantity, // Update the quantity
                            totalPrice: quantity * item.discountedPrice, // Calculate total price based on new quantity
                        };
                    }
                    return item;
                });

                return {
                    ...old,
                    cartItems: updatedItems,
                };
            });

            // Return a context object with the previous value
            return { previousCart };
        },
        onSettled: () => {
            // Always refetch after error or success
            queryClient.invalidateQueries(['cart']);
        },
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            toast.success(data?.data?.message);
        },
    });

    return { addToCart: mutate, isAdding: isLoading };
}
