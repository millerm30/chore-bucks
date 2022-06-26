import React, {useContext, useState, useEffect} from "react";
import toast from "react-hot-toast";
import {v4 as uuid} from "uuid";

const ShoppingContext = React.createContext();

function getInitalCart() {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
}

export function ShoppingProvider({ children }) {
    const [addToCart , setAddToCart] = useState(getInitalCart);

    const addToCartHandler = (wish, title, points) => {
        setAddToCart([...addToCart, {title: title, points: points, id: uuid()}]);
    };

    const removeFromCartHandler = (wish) => {
        toast.error(`${wish.title} removed from shopping cart!`);
        setAddToCart(addToCart.filter((i) => i !== wish));
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(addToCart));
    }
    , [addToCart]);

    return (
        <ShoppingContext.Provider value={{ addToCart, addToCartHandler, removeFromCartHandler }}>
        {children}
        </ShoppingContext.Provider>
    );
}

export const useShopping = () => useContext(ShoppingContext);