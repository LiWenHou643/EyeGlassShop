import { useMutation } from '@tanstack/react-query';
import { useAxiosPrivate } from './useAxiosPrivate';

export const useCheckout = () => {
    const axiosPrivate = useAxiosPrivate();

    const createCheckout = async (data) => {
        const response = await axiosPrivate.post('/order/create', data);
        console.log(data);

        console.log('Response:', response.data);
        if (!response.data.code !== 1000) {
            throw new Error('An error occurred while processing the payment');
        }

        return response.data.json();
    };

    const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
        mutationFn: createCheckout,
        onSuccess: async (data) => {
            console.log('Checkout successful:', data);
        },
        onError: async () => {
            // Rollback the optimistic updates
        },
    });

    return { isCheckingOut, checkout };
};
