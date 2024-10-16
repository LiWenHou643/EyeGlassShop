import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem('cart')) || []
    );
    const [totalPrice, setTotalPrice] = useState(0);
    const [promoCode, setPromoCode] = useState('');

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    };
    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                addToCart,
                removeFromCart,
                totalPrice,
                setTotalPrice,
                promoCode,
                setPromoCode,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
