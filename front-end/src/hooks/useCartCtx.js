import { useContext } from 'react';
import CartContext from '../context/CartContext';

export const useCartCtx = () => {
    return useContext(CartContext);
};
