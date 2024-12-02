import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

export function useRemoveCartItem() {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ cartItemId }) => {
            return axiosPrivate.delete(
                `/user/cart/remove/${cartItemId}`,
                null,
                {}
            );
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

    return { removeItem: mutate, isRemoving: isLoading };
}
