import { createContext, useEffect, useState } from "react";

// Create a context to manage shopping cart state across the application
const CartContext = createContext();

// CartProvider component to wrap around the application
export const CartProvider = ({ children }) => {
    // Initialize cart state from localStorage for persistence between page reloads
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    // Save cart items to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);    
    
    // Add a new item to the cart
    const addToCart = (item) => {
        setCartItems((prev) => [...prev, item]);
    };

    // Clear all items from the cart
    const clearCart = () => setCartItems([]);

    // Helper property to check if the cart contains any items
    const hasItems = cartItems.length > 0;    
    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, clearCart, hasItems }}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext };