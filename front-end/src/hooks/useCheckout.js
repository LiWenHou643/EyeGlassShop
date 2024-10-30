import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAxiosPrivate } from './useAxiosPrivate';

export const useCheckout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const createCheckout = async (data) => {
        const response = await axiosPrivate.post('/orders/create', data);
        if (response.data.code !== 1000) {
            throw new Error('An error occurred while processing the payment');
        }

        return response.data;
    };

    const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
        mutationFn: createCheckout,
        onSuccess: async (data) => {
            const url = data?.data?.paymentUrl;
            const orderId = data?.data?.orderId;
            if (url && url !== 'cod') {
                window.location.href = url;
            } else {
                navigate(`/track-order/${orderId}`, { replace: true });
            }

            // Invalidate the cart query
            queryClient.invalidateQueries('cart');
        },
        onError: async () => {
            // Rollback the optimistic updates
        },
    });

    return { isCheckingOut, checkout };
};
