import React, { useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import remove from "../sounds/remove.mp3";
import purchse from "../sounds/purchase.mp3";
import nomoney from "../sounds/nomoney.mp3";
import { useUser } from "./Auth";

const ShoppingContext = React.createContext();

let audioRemove = new Audio(remove);
let audioPurchase = new Audio(purchse);
let audioNomoney = new Audio(nomoney);

export function ShoppingProvider({ points, removePoints, children }) {
  const [cart, setCart] = useState([]);
  const [cartTotal, setcartTotal] = useState(Number(0));
  const { user } = useUser();
  
  const addToCartHandler = useCallback(
    (wish) => {
      setCart([...cart, wish]);
    },
    [cart]
  );
  
  const updateCartItem = (item) => {
    setCart(
      cart.map((i) => {
        if (i.id === item.id) {
          return item;
        }
        return i;
      })
    );
  };

  const getInitalCart = async () => {
    try {
      const response = await fetch("http://localhost:3001/cart/getcart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
      });
      const parseRes = await response.json();
      setCart(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  };

 const removeFromCartHandler = async (item) => {
   try {
    await fetch(`http://localhost:3001/cart/removefromcart/${item}`, {
      method: "DELETE",
      headers: { token: localStorage.token },
    });
    setCart(cart.filter((i) => i.wish_id !== item));
    audioRemove.play();
  } catch (error) {
    console.error(error.message);
  }
 };

  const purchaseCartHandler = () => {
    if (
      points >= cart.reduce((acc, curr) => acc + curr.points * curr.quantity, 0)
    ) {
      cart.forEach(() =>
        removePoints(
          cart.reduce((acc, curr) => acc + curr.points * curr.quantity, 0)
        )
      );
      setCart([]);
      audioPurchase.play();
      toast("🎉 Purchase successful. Great job! 🎉");
    } else {
      audioNomoney.play();
      toast(
        "👎 Not enough points to purchase! Keep working on your chores! 😉"
      );
    }
  };

  useEffect(() => {
    if (user) {
      getInitalCart();
      setcartTotal(
        cart.reduce((acc, curr) => acc + curr.points * curr.quantity, 0)
      );
    }
  }, [cartTotal, user]);

  /* Old code
    useEffect(() => {
        localStorage.setItem("cartList", JSON.stringify(cart));
        setcartTotal(cart.reduce((acc, curr) => acc + curr.points * curr.quantity, 0));
    }, [cart, cartTotal]);
    */

  return (
    <ShoppingContext.Provider
      value={{
        cart,
        addToCartHandler,
        removeFromCartHandler,
        purchaseCartHandler,
        cartTotal,
        updateCartItem,
        setCart
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}

export const useShopping = () => useContext(ShoppingContext);
