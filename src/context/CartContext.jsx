import { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext(undefined);
export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('ecoshop_cart');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });
    const addToCart = (product, quantity = 1) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
            }
            return [...prev, { ...product, quantity }];
        });
    };
    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };
    const updateQuantity = (productId, quantity) => {
        setCart((prev) => prev.map((item) => item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item));
    };
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('ecoshop_cart');
    };
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem('ecoshop_cart', JSON.stringify(cart));
    }, [cart]);

    return (<CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>);
}
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
