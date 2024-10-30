import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

export const useCancelOrder = () => {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const cancel = async (id) => {
        const { data } = await axiosPrivate.put(`/orders/cancel/${id}`);
        console.log(data.data);
        return data.data;
    };

    const { mutate: doCancel, isCanceling } = useMutation({
        mutationFn: cancel,
        onSuccess: () => {
            toast.success('Order has been canceled.');
            queryClient.invalidateQueries('orders');
        },
    });

    return { doCancel, isCanceling };
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
