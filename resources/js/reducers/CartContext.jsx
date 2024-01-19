import { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.action) {
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
    
      if (existingItem) {
        //alert('Cette voiture existe déjà dan votre panier')
       const updatedCartAdd= state.cartItems.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity  } : item
          );
        localStorage.setItem('cartItems', JSON.stringify(updatedCartAdd));
        return { ...state, cartItems: updatedCartAdd };
      } else {
        const updatedCartAdd = [...state.cartItems, { ...action.payload, quantity: 1 }];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartAdd));
        return { ...state, cartItems: updatedCartAdd };
      }

    case 'REMOVE_FROM_CART':
      const updatedCartRemove = state.cartItems.filter(item => item.id !== action.payload.id);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartRemove));
      return { ...state, cartItems: updatedCartRemove };
    case 'SET_CART_ITEMS':
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
};

const CmdReducer = (state, action) => {
  switch (action.action) {
    case 'ADD_CMD':
      const existingItem = state.cmtItems.find(item => item.id === action.payload.id);    
      if (existingItem) {
        //alert('Cette voiture existe déjà dan votre panier')
       const updatedCmdAdd= state.cmtItems.map(item =>
            item.id === action.payload.id ? { ...item, prix: item?.prix , etat:item?.etat, data:item?.data, } : item
          );
        localStorage.setItem('cmtItems', JSON.stringify(updatedCmdAdd));
        return { ...state, cmtItems: updatedCmdAdd };
      } else {
        const updatedCmdAdd = [...state.cmtItems, { ...action.payload  }];
        localStorage.setItem('cmtItems', JSON.stringify(updatedCmdAdd));
        return { ...state, cmtItems: updatedCmdAdd };
      }

    case 'REMOVE_CMD':
      const updatedCmdRemove = state.cartItems.filter(item => item.id !== action.payload.id);
      localStorage.setItem('cartItems', JSON.stringify(updatedCmdRemove));
      return { ...state, cartItems: updatedCmdRemove };
    case 'SET_CMD':
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
};


const CmdProvider = ({ children }) => {
  const [cmdState, dispatch] = useReducer(CmdReducer, { cmdItems: [] });
  useEffect(() => {
    const storedCmdItems = localStorage.getItem('cmdItems');
      if (storedCmdItems) {
        dispatch({ action: 'SET_CMD', payload: JSON.parse(storedCmdItems) });
      }
    },[]);
    return (
      <CartContext.Provider value={{ cmdState, dispatch }}>
        {children}
      </CartContext.Provider>
    );
  };

const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { cartItems: [] });
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        dispatch({ action: 'SET_CART_ITEMS', payload: JSON.parse(storedCartItems) });
      }
    },[]);

    return (
      <CartContext.Provider value={{ cartState, dispatch }}>
        {children}
      </CartContext.Provider>
    );
  };
  

  const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCart doit être utilisé dans un CartProvider');
    }
    return context;
  };
  const useCmd= () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCmd doit être utilisé dans un CartProvider');
    }
    return context;
  };

  export { CartProvider, useCart, useCmd }
