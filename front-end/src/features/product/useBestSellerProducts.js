import { useQuery } from '@tanstack/react-query';
import { getBestSellerProducts } from '../../services/apiProduct';

export function useBestSellerProducts() {
    const { data, isLoading, error } = useQuery(
        ['bestSellerProducts'],
        getBestSellerProducts,
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
