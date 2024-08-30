import { useMutation } from '@tanstack/react-query';
import { register } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useCreateUser() {
    const { mutateAsync: createUser, isLoading: isCreatingUser } = useMutation({
        mutationFn: register,
        onSuccess: (response) => {
            toast.success('User created successfully');
            return response;
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.message || 'An unknown error occurred';

            toast.error(errorMessage);
        },
    });
    return { createUser, isCreatingUser };
}
