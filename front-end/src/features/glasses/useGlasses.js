import { getGlassProducts } from '../../services/apiProduct';
import { useQuery } from '@tanstack/react-query';

export function useGlasses({ category, sort = 'title-asc', page = 1 }) {
    const { isLoading, error, data } = useQuery({
        queryKey: ['glasses', category, sort, page],
        queryFn: () => getGlassProducts({ category, sort, page }),
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        staleTime: 60000,
    });

    return { isLoading, error, data: data?.data.content || [] };
}
