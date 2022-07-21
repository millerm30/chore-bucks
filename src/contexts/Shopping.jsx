import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { v4 as uuid} from "uuid";
import remove from "../sounds/remove.mp3";
import purchse from "../sounds/purchase.mp3";
import nomoney from "../sounds/nomoney.mp3";

const ShoppingContext = React.createContext();

function getInitalCart() {
  return localStorage.getItem("cartList")
    ? JSON.parse(localStorage.getItem("cartList"))
    : [];
};

let audioRemove = new Audio(remove);
let audioPurchase = new Audio(purchse);
let audioNomoney = new Audio(nomoney);

export function ShoppingProvider({ points, removePoints, children }) {
    const [cart , setCart] = useState(getInitalCart);
    const [cartTotal, setcartTotal] = useState(0);
    
    const addToCartHandler = (itemTitle, itemPoints) => {
        setCart([...cart, { title: itemTitle, points: itemPoints, id: uuid() }]);
    };

    const removeFromCartHandler = (wish) => {
        audioRemove.play();
        toast.error(`${wish.title} removed from shopping cart!`);
        setCart(cart.filter((i) => i !== wish));
    };

    const purchaseCartHandler = () => {
        if (points >= cart.reduce((acc, curr) => acc + curr.points, 0)) {
        cart.forEach(() => removePoints(cart.reduce((acc, curr) => acc + curr.points, 0)));
        setCart([]);
        audioPurchase.play();
        toast.success("🎉 Purchase successful. Great job! 🎉");
        } else {
        audioNomoney.play();
        toast.error("👎 Not enough points to purchase! Keep working on your chores! 😉");
        }
    };

    useEffect(() => {
        localStorage.setItem("cartList", JSON.stringify(cart));
        setcartTotal(cart.reduce((acc, curr) => acc + curr.points, 0));
    }, [cart, cartTotal]);

    return (
        <ShoppingContext.Provider value={{ cart, addToCartHandler, removeFromCartHandler, purchaseCartHandler, cartTotal }}>
        {children}
        </ShoppingContext.Provider>
    );
}

export const useShopping = () => useContext(ShoppingContext);