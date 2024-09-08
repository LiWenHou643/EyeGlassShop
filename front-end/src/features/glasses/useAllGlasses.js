import { getAllGlassProducts } from '../../services/apiProduct';
import { useQuery } from '@tanstack/react-query';

export function useAllGlasses() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['glasses'],
        queryFn: getAllGlassProducts,
    });

    return { isLoading, error, data: data?.data };
}
