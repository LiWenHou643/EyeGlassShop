import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/apiProduct';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PAGE_SIZE } from '../../utils/constant';

export function useProducts() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    // Filter products based on the query string
    const categoryValue = searchParams.get('category');
    const category =
        !categoryValue || categoryValue === 'all' ? null : categoryValue;

    // Sort products based on the query string
    const sortBy = searchParams.get('sort') || 'title-asc';
    const [field, direction] = sortBy.split('-');
    const sort = `${field}-${direction}`;

    // Pagination
    const page = !searchParams.get('page')
        ? 1
        : Number(searchParams.get('page'));

    // Query the API
    const { isLoading, error, data } = useQuery({
        queryKey: ['products', category, sort, page],
        queryFn: () => getProducts({ category, sort, page }),
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Prefetch the next and previous pages
    const totalPages = Math.ceil(data?.data.totalElements / PAGE_SIZE);

    if (page < totalPages)
        queryClient.prefetchQuery({
            queryKey: ['products', category, sort, page + 1],
            queryFn: () => getProducts({ category, sort, page: page + 1 }),
        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ['products', category, sort, page - 1],
            queryFn: () => getProducts({ category, sort, page: page - 1 }),
        });

    // Return the data
    return {
        isLoading,
        error,
        data: data?.data.content || [],
        count: data?.data.totalElements || 0,
    };
}
