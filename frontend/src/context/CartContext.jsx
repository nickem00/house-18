import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems((prev) => [...prev, item]);
    };

    const clearCart = () => setCartItems([]);

    const hasItems = cartItems.length > 0;

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, clearCart, hasItems }}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext };