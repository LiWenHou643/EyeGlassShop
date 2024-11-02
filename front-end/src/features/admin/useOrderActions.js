import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

export const useConfirmOrder = () => {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    const { mutateAsync, isLoading } = useMutation(
        async (orderId) => {
            console.log('confirming order', orderId);
            const { data } = await axiosPrivate.put(`/admin/confirm`, null, {
                params: { orderId },
            });
            console.log('confirmed order', data);
            return data.data;
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries('orders');
            },
        }
    );

    return { confirmOrder: mutateAsync, isConfirming: isLoading };
};

export const useShipOrder = () => {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    const { mutateAsync, isLoading } = useMutation(
        async (orderId) => {
            console.log('shipping order', orderId);
            const { data } = await axiosPrivate.put(`/admin/ship`, null, {
                params: { orderId },
            });
            console.log('shipped order', data);
            return data.data;
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries('orders');
            },
        }
    );

    return { shipOrder: mutateAsync, isShipping: isLoading };
};
