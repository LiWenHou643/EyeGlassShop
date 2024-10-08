import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(localStorage.getItem('cart') || []);
    const [cartCount, setCartCount] = useState(
        localStorage.getItem('cartCount') || 0
    );
    const [totalPrice, setTotalPrice] = useState(0);
    const [promoCode, setPromoCode] = useState('');

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
        setCartCount((prevCount) => prevCount + 1);
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
        setCartCount((prevCount) => prevCount - 1);
    };
    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                cartCount,
                setCartCount,
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
