import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

export const useUpdateCartItem = () => {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const { mutate: updateCartItem, isLoading: isUpdating } = useMutation({
        mutationFn: async ({ id, quantity }) => {
            const response = await axiosPrivate.put(
                `/user/cart/update/${id}`,
                null,
                {
                    params: { quantity },
                }
            );
            return response.data;
        },
        onMutate: async ({ id, quantity }) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(['cart']);

            // Snapshot the previous value
            const previousCart = queryClient.getQueryData(['cart']);

            // Optimistically update to the new value
            queryClient.setQueryData(['cart'], (old) => {
                if (!old) return; // If no old data, return nothing
                console.log(old.cartItems);
                const newa = {
                    ...old,
                    cartItems: old.cartItems.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                };

                console.log(newa.cartItems);
                return newa;
            });

            // Return a context object with the previous value
            return { previousCart };
        },
        onError: (err, variables, context) => {
            // Rollback to the previous value
            queryClient.setQueryData(['cart'], context.previousCart);
            toast.error(err.message);
        },
        onSettled: () => {
            // Always refetch after error or success
            queryClient.invalidateQueries(['cart']);
        },
    });

    return { updateCartItem, isUpdating };
};
