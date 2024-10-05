import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

export function useUpdateProfile() {
    const axiosPrivate = useAxiosPrivate();

    const update = async (data) => {
        try {
            console.log('Trying update profile:', data);
            const response = await axiosPrivate.put('/user/update', data);
            return response.data;
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const { mutateAsync: updateProfile, isLoading: isUpdatingProfile } =
        useMutation({
            mutationFn: update,
            onSuccess: (response) => {
                toast.success(response.message);
                return response.data;
            },
            onError: (error) => {
                const errorMessage =
                    error?.message || 'An unknown error occurred';

                toast.error(errorMessage);
            },
        });

    return { updateProfile, isUpdatingProfile };
}
