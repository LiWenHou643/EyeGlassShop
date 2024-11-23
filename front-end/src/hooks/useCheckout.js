import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAxiosPrivate } from './useAxiosPrivate';

export const useCheckout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const createCheckout = async (data) => {
        const response = await axiosPrivate.post('/orders/create', data);
        if (response.data.code !== 1000) {
            // Attach the response data to a custom error
            const error = new Error('Checkout failed');
            error.response = response.data; // Attach the full response data
            throw error;
        }

        return response.data;
    };

    const {
        mutate: checkout,
        isLoading: isCheckingOut,
        error,
    } = useMutation({
        mutationFn: createCheckout,
        onSuccess: async (data) => {
            const url = data?.data?.paymentUrl;
            const orderId = data?.data?.orderId;
            if (url && url !== 'cod') {
                window.location.href = url;
            } else {
                navigate(`/order-details/${orderId}`, { replace: true });
            }

            // Invalidate the cart query
            queryClient.invalidateQueries('cart', 'orders');
        },
        onError: async (error) => {
            console.log(error.response); // Access the attached response
            toast.error(
                error.response.message || 'An error occurred during checkout.'
            );
        },
    });

    return { isCheckingOut, checkout, error };
};
