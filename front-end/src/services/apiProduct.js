import { publicApi } from './apiClient';
import { PAGE_SIZE } from '../utils/constant';

export const getProducts = async ({
    category,
    sort = 'title-asc',
    page = 1,
    debouncedSearch,
}) => {
    const response = await publicApi.get('/products', {
        params: {
            category,
            page,
            size: PAGE_SIZE,
            sort,
            search: debouncedSearch,
        },
    });
    return response.data;
};

export const searchProducts = async (debouncedSearch) => {
    const response = await publicApi.get('/products/search', {
        params: {
            search: debouncedSearch,
        },
    });
    return response.data;
};

export const getProductById = async (id) => {
    const response = await publicApi.get(`/products/${id}`);
    return response.data;
};

export const getBestSellerProducts = async () => {
    const response = await publicApi.get('/products/best-seller');
    return response.data;
};

export const getBigSalesProducts = async () => {
    const response = await publicApi.get('/products/most-discount');
    return response.data;
};
