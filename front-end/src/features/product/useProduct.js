import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../../services/apiProduct';

export function useProduct(id) {
    const { isLoading, error, data } = useQuery(
        ['products', id],
        () => getProductById(id),
        {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5, // 5 minutes
        }
    );

    return { isLoading, error, data };
}
