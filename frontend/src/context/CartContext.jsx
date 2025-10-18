import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || []
      };
    
    case 'LOAD_WISHLIST':
      return {
        ...state,
        wishlist: action.payload || []
      };
    
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let newItems;
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        );
      } else {
        newItems = [...state.items, { 
          ...action.payload, 
          quantity: action.payload.quantity || 1 
        }];
      }
      
      localStorage.setItem('shopzy-cart', JSON.stringify(newItems));
      return { ...state, items: newItems };
    
    case 'REMOVE_FROM_CART':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('shopzy-cart', JSON.stringify(filteredItems));
      return { ...state, items: filteredItems };
    
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      localStorage.setItem('shopzy-cart', JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };
    
    case 'CLEAR_CART':
      localStorage.removeItem('shopzy-cart');
      return { ...state, items: [] };
    
    case 'ADD_TO_WISHLIST':
      const existingWishlistItem = state.wishlist.find(item => item.id === action.payload.id);
      let newWishlist;
      
      if (existingWishlistItem) {
        newWishlist = state.wishlist.filter(item => item.id !== action.payload.id);
      } else {
        newWishlist = [...state.wishlist, action.payload];
      }
      
      localStorage.setItem('shopzy-wishlist', JSON.stringify(newWishlist));
      return { ...state, wishlist: newWishlist };
    
    case 'REMOVE_FROM_WISHLIST':
      const filteredWishlist = state.wishlist.filter(item => item.id !== action.payload);
      localStorage.setItem('shopzy-wishlist', JSON.stringify(filteredWishlist));
      return { ...state, wishlist: filteredWishlist };
    
    default:
      return state;
  }
};

const initialState = {
  items: [],
  wishlist: []
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('shopzy-cart');
    const savedWishlist = localStorage.getItem('shopzy-wishlist');
    
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
    if (savedWishlist) {
      dispatch({ type: 'LOAD_WISHLIST', payload: JSON.parse(savedWishlist) });
    }
  }, []);

  const addToCart = (product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addToWishlist = (product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const getCartTotal = () => {
    return cartState.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartState.items.reduce((count, item) => count + item.quantity, 0);
  };

  const getWishlistCount = () => {
    return cartState.wishlist.length;
  };

  const isInWishlist = (productId) => {
    return cartState.wishlist.some(item => item.id === productId);
  };

  return (
    <CartContext.Provider value={{
      cart: cartState,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      getCartTotal,
      getCartItemsCount,
      getWishlistCount,
      isInWishlist
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};