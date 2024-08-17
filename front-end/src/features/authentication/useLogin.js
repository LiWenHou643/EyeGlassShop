import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as lg } from '../../services/UserApi';
import { toast } from 'react-hot-toast';

export function useCreateUser() {
    const queryClient = useQueryClient();

    const { mutate: login, isLoading: isLoggingin } = useMutation({
        mutationFn: lg,
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
    return { login, isLoggingin };
}
