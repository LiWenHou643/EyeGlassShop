import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

export const useConfirmOrder = () => {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    const { mutateAsync, isLoading } = useMutation(
        async (orderId) => {
            console.log('confirming order', orderId);
            const { data } = await axiosPrivate.post(
                `/orders/${orderId}/confirm`
            );
            console.log('confirmed order', data);
            return data.data;
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries('orders');
            },
        }
    );

    return { confirmOrder: mutateAsync, isLoading };
};

export const useShipOrder = () => {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    const { mutateAsync, isLoading } = useMutation(
        async (orderId) => {
            console.log('shipping order', orderId);
            const { data } = await axiosPrivate.post(`/orders/${orderId}/ship`);
            console.log('shipped order', data);
            return data.data;
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries('orders');
            },
        }
    );

    return { shipOrder: mutateAsync, isLoading };
};
