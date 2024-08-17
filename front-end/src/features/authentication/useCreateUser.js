import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register } from '../../services/UserApi';
import { toast } from 'react-hot-toast';

export function useCreateUser() {
    const queryClient = useQueryClient();

    const { mutateAsync: createUser, isLoading: isCreatingUser } = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['users'],
            });
            toast.success('User created successfully');
            return data;
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    switch (error.response.status) {
                        case 409:
                            toast.error(
                                'User already exists with the provided email.'
                            );
                            break;
                        case 500:
                            toast.error(
                                'Internal server error. Please try again later.'
                            );
                            break;
                        default:
                            toast.error(
                                'An error occurred during registration.'
                            );
                    }
                } else {
                    toast.error(
                        'No response from server. Please check your network connection.'
                    );
                }
            } else {
                toast.error('Unexpected error occurred.');
            }
        },
    });
    return { createUser, isCreatingUser };
}
