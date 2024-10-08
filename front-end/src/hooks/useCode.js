import { useMutation } from '@tanstack/react-query';
import { useAxiosPrivate } from './useAxiosPrivate';

export const useCode = (code) => {
    const axiosPrivate = useAxiosPrivate();
    const {
        mutateAsync: checkCode,
        isLoading: isChecking,
        error,
    } = useMutation({
        mutationFn: async (code) => {
            const response = await axiosPrivate.post('/code', { code });
            return response.data;
        },
        onSuccess: (res) => {
            if (res.code !== 1000) {
                throw new Error(res.message);
            }
        },
    });

    return { checkCode, isChecking, error };
};
