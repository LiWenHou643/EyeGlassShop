import { useQuery } from '@tanstack/react-query';
import { getCart } from '../../services/apiCart';
export function useCart() {
    const { isLoading, data, error } = useQuery('cart', getCart);

    return { isLoading, data, error };
}
