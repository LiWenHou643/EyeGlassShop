import { PAGE_SIZE } from '../utils/constant';
import axios from './axios';

export const getProducts = async ({
    category,
    sort = 'title-asc',
    page = 1,
    debouncedSearch,
}) => {
    const response = await axios.get('/public/products', {
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
    const response = await axios.get('/public/products/search', {
        params: {
            title: debouncedSearch,
        },
    });
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axios.get(`/public/products/${id}`);
    return response.data;
};

export const getBestSellerProducts = async () => {
    const response = await axios.get('/public/products/best-seller');
    return response.data;
};

export const getBigSalesProducts = async () => {
    const response = await axios.get('/public/products/most-discount');
    return response.data;
};
