import { publicApi } from './apiClient';

export const getGlassProducts = async () => {
    const response = await publicApi.get('/products');
    return response.data;
};
