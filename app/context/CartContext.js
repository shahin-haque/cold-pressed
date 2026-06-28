'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load cart', e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, quantity) => {
    const existingIndex = cartItems.findIndex(
      item => item.id === product.id && item.size === size.name
    );

    if (existingIndex >= 0) {
      const newCart = [...cartItems];
      newCart[existingIndex].quantity += quantity;
      setCartItems(newCart);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          size: size.name,
          price: size.price,
          quantity,
        },
      ]);
    }
    setIsCartOpen(true);
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      const newCart = cartItems.filter((_, i) => i !== index);
      setCartItems(newCart);
    } else {
      const newCart = cartItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(newCart);
    }
  };

  const removeFromCart = (index) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const saveOrderTimestamp = (orderTotal, orderItems) => {
    const order = {
      timestamp: Date.now(),
      total: orderTotal,
      items: orderItems,
    };
    setLastOrder(order);
    localStorage.setItem('lastOrder', JSON.stringify(order));
  };

  const getLastOrderTime = () => {
    if (lastOrder) return lastOrder.timestamp;
    const saved = localStorage.getItem('lastOrder');
    if (saved) {
      try {
        return JSON.parse(saved).timestamp;
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  const getLastOrderItems = () => {
    if (lastOrder) return lastOrder.items || [];
    const saved = localStorage.getItem('lastOrder');
    if (saved) {
      try {
        return JSON.parse(saved).items || [];
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  const addLastOrderToCart = () => {
    const items = getLastOrderItems();
    items.forEach(item => {
      addToCart(
        { id: item.id, name: item.name, image: item.image },
        { name: item.size, price: item.price },
        item.quantity
      );
    });
  };

  const isWithin12Hours = () => {
    const timestamp = getLastOrderTime();
    if (!timestamp) return false;
    const twelveHours = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
    return Date.now() - timestamp < twelveHours;
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        saveOrderTimestamp,
        getLastOrderTime,
        getLastOrderItems,
        addLastOrderToCart,
        isWithin12Hours,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}