import React, { useContext, useState, useEffect } from "react";
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
  const [cartTotal, setCartTotal] = useState(Number(0));
  const { user } = useUser();
  const [cartItem, setCartItem] = useState([]);

  const addToCartHandler = (wish) => {
    setCart([...cart, wish]);
    setCartItem([...cartItem, wish]);
    setCartTotal(cartTotal + wish.wish_value);
    calculateCartTotal();
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
      setCartTotal(cartTotal - item.wish_value);
      setCartItem(cartItem.filter((i) => i.wish_id !== item));
      audioRemove.play();
      calculateCartTotal();

      const updateBody = { item, completed: false };
      await fetch(`http://localhost:3001/wishes/updatewish/${item}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(updateBody),
      });
    } catch (error) {
      console.error(error.message);
    }
  };

 const purchaseCartHandler = async () => {
    if (points >= cartTotal) {
      try {
        await fetch("http://localhost:3001/cart/checkout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
        });
        console.log("cartTotal", cartTotal);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      audioNomoney.play();
      toast.error("You do not have enough points!");
    }
  };

  const calculateCartTotal = async () => {
    try {
      const response = await fetch("http://localhost:3001/cart/getcarttotal", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
      });
      const parseRes = await response.json();
      const convertResponseToNumber = Number(parseRes);
      setCartTotal(convertResponseToNumber);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getInitalCart();
    }
  }, [user]);

  return (
    <ShoppingContext.Provider
      value={{
        cart,
        cartItem,
        addToCartHandler,
        removeFromCartHandler,
        purchaseCartHandler,
        cartTotal,
        setCart,
        getInitalCart,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}

export const useShopping = () => useContext(ShoppingContext);
