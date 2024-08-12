import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser as create } from '../../services/UserApi';
import { toast } from 'react-hot-toast';

export function useCreateUser() {
    const queryClient = useQueryClient();

    const { mutate: createUser, isLoading: isCreatingUser } = useMutation({
        mutationFn: create,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users'],
            });
            toast.success('User created successfully');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return { createUser, isCreatingUser };
}
