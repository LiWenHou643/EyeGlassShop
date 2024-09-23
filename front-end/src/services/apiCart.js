import { privateApi } from './apiClient';

export const getCart = async () => {
    const response = await privateApi.get('/user/cart');
    return response.data;
};
