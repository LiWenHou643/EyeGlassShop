import { publicApi } from './apiClient';

export const getAllGlassProducts = async () => {
    const response = await publicApi.get('/products');
    return response.data;
};
