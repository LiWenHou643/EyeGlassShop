import { useQuery } from '@tanstack/react-query';
import { getBigSalesProducts } from '../../services/apiProduct';

export function useBigSalesProducts() {
    const { data, isLoading, error } = useQuery(
        ['bigSalesProducts'],
        getBigSalesProducts,
        {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
        }
    );
    return {
        data: data?.data.content,
        count: data?.data.size,
        isLoading,
        error,
    };
}
