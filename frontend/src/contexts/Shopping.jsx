import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
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
  const [cartTotal, setcartTotal] = useState(0);
  const { user } = useUser();

  const addToCartHandler = (itemTitle, itemPoints) => {
    setCart([
      ...cart,
      { title: itemTitle, points: itemPoints, quantity: 1, id: uuid() },
    ]);
  };

  const updateCartItem = (wish) => {
    setCart(
      cart.map((w) => {
        if (w.id === wish.id) {
          return wish;
        }
        return w;
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

  // This function still needs a little work to complete the name of the ish on delete from cart for the toast!
  const removeFromCartHandler = async (wish) => {
    try {
      await fetch(`http://localhost:3001/cart/removefromcart/${wish}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });
      setCart(cart.filter((i) => i !== wish));
      audioRemove.play();
    } catch (error) {
      console.error(error.message);
    }
  };

  /* Old code
  const removeFromCartHandler = (wish) => {
    audioRemove.play();
    toast(`😭 ${wish.title} removed from shopping cart!`);
    setCart(cart.filter((i) => i !== wish));
  };
  */

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
    if (user)
    getInitalCart();
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
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}

export const useShopping = () => useContext(ShoppingContext);
