import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

export const useCancelOrder = () => {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const cancel = async (id) => {
        const { data } = await axiosPrivate.put(`/orders/cancel/${id}`);
        return data.data;
    };

    const { mutate: doCancel, isCanceling } = useMutation({
        mutationFn: cancel,
        onSuccess: (canceledOrder) => {
            // Use structured query key ['orders'] to update the cache
            queryClient.setQueryData(['orders'], (oldData) => {
                if (!oldData) return oldData; // Ensure data exists

                // Assuming `oldData` is a flat array of orders
                return oldData.map((order) =>
                    order.id === canceledOrder.id
                        ? { ...order, status: 'CANCELLED' }
                        : order
                );
            });

            toast.success('Order has been canceled.');
        },
        onSettled: () => {
            // Invalidate the query to ensure data consistency
            queryClient.invalidateQueries('orders');
        },
    });

    return { doCancel, isCanceling };
};

export const useConfirmReceipt = () => {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const confirm = async (id) => {
        const { data } = await axiosPrivate.put(`/orders/confirmReceipt/${id}`);
        console.log(data.data);
        return data.data;
    };

    const { mutate: doConfirmReceipt, isConfirming } = useMutation({
        mutationFn: confirm,
        onSuccess: (res) => {
            toast.success('Order has been confirmed.');
            queryClient.invalidateQueries('order', res.id);
            queryClient.invalidateQueries('orders');
        },
    });

    return { doConfirmReceipt, isConfirming };
};

export const useTrackOrder = (id) => {
    const axiosPrivate = useAxiosPrivate();

    const track = async (id) => {
        const { data } = await axiosPrivate.get(`/orders/track/${id}`);
        return data.data;
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['trackOrder', id],
        queryFn: () => track(id),
        refetchOnWindowFocus: false,
    });

    return {
        trackOrder: data,
        isTracking: isLoading,
        error,
    };
};
