import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

export function useUpdateInCart() {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ cartItemId, quantity }) => {
            return axiosPrivate.post(`user/cart/update`, null, {
                params: {
                    cartItemId: cartItemId,
                    quantity: quantity,
                },
            });
        },
        onMutate: async ({ cartItemId, quantity }) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(['cart']);

            // Snapshot the previous value
            const previousCart = queryClient.getQueryData(['cart']);

            // Optimistically update to the new value
            queryClient.setQueryData(['cart'], (old) => {
                if (!old) return; // If no old data, return nothing
                const updatedItems = old.cartItems.map((item) => {
                    if (item.id === cartItemId) {
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

            return { previousCart };
        },
        onSettled: () => {
            queryClient.invalidateQueries(['cart']);
        },
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            toast.success(data?.data?.message);
        },
    });

    return { updateCart: mutate, isUpdating: isLoading };
}
