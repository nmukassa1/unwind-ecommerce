// create a cart context, provider, and usehook
import React, { createContext, useContext, useReducer } from 'react';

// Create a context
const CartContext = createContext();

// Create a provider

export const CartProvider = ({ children }) => {
    const initialState = {
        cart: [],
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD_TO_CART':
                return {
                    ...state,
                    cart: [...state.cart, action.payload],
                };
            case 'REMOVE_FROM_CART':
                return {
                    ...state,
                    cart: state.cart.filter((item) => item.id !== action.payload.id),
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

// Create a custom hook

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

