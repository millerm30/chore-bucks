import React, {useContext, useState} from "react";

const ShoppingContext = React.createContext();

export function ShoppingProvider({ children }) {
    const [addToCart , setAddToCart] = useState([]);

    const addToCartHandler = ({wish}) => {
        setAddToCart(addToCart.concat(wish));
    };

    return (
        <ShoppingContext.Provider value={{ addToCart, addToCartHandler }}>
        {children}
        </ShoppingContext.Provider>
    );
}

export const useShopping = () => useContext(ShoppingContext);