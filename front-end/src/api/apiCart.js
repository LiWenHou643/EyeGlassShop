import { axiosPrivate } from './axios';

export const getCart = async () => {
    const response = await axiosPrivate.get('/user/cart');
    return response.data;
};
