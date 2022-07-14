import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { v4 as uuid} from "uuid";

const ShoppingContext = React.createContext();

function getInitalCart() {
  return localStorage.getItem("cartList")
    ? JSON.parse(localStorage.getItem("cartList"))
    : [];
};

export function ShoppingProvider({ points, removePoints, children }) {
    const [cart , setCart] = useState(getInitalCart);
    
    const addToCartHandler = (itemTitle, itemPoints) => {
        setCart([...cart, { title: itemTitle, points: itemPoints, id: uuid() }]);
    };

    const removeFromCartHandler = (wish) => {
        toast.error(`${wish.title} removed from shopping cart!`);
        setCart(cart.filter((i) => i !== wish));
    };

    const purchaseCartHandler = () => {
        if (points >= cart.reduce((acc, curr) => acc + curr.points, 0)) {
        cart.forEach(() => removePoints(cart.reduce((acc, curr) => acc + curr.points, 0)));
        setCart([]);
        toast.success("🎉 Purchase successful. Great job! 🎉");
        } else {
        toast.error("👎 Not enough points to purchase! Keep working on your chores! 😉");
        }
    };

    useEffect(() => {
        localStorage.setItem("cartList", JSON.stringify(cart));
    }, [cart]);

    return (
        <ShoppingContext.Provider value={{ cart, addToCartHandler, removeFromCartHandler, purchaseCartHandler }}>
        {children}
        </ShoppingContext.Provider>
    );
}

export const useShopping = () => useContext(ShoppingContext);