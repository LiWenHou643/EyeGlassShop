import { getGlassProducts } from '../../services/apiProduct';
import { useQuery } from '@tanstack/react-query';

export function useGlasses() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['glasses'],
        queryFn: getGlassProducts,
    });

    return { isLoading, error, data: data?.data };
}
