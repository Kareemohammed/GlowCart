import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      cart,
      addToCart,
      removeFromCart,
    }}>
      {children}
    </AppContext.Provider>
  );
};
