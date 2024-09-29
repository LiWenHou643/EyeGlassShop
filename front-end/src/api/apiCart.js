import { axiosPrivate } from './axios';

export const getCart = async () => {
    const response = await axiosPrivate.get('/user/cart');
    console.log('res api', response);
    return response.data;
};
