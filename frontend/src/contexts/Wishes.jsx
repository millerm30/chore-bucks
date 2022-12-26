import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useShopping } from "./Shopping";
import success from "../sounds/success.mp3";
import negative from "../sounds/icqdelete.mp3";
import yay from "../sounds/yay.mp3";

const WishesContext = React.createContext();

let audioAddWish = new Audio(success);
let audioFailure = new Audio(negative);
let audioSuccess = new Audio(yay);

export function WishesProvider({ children }) {
    const { addToCartHandler } = useShopping();
    const [wishes, setWishes] = useState([]);
    const [newWishes, setNewWishes] = useState([]);
    const [wishStatus, setWishStatus] = useState("Add Wish Item");
    
    const getAllWishes = async () => {
      try {
        const getWishes = await fetch("http://localhost:3001/wishes/getwishes", {
          method: "GET",
          headers: { "Content-Type": "application/json", token: localStorage.token },
        })
        const response = await getWishes.json();
        setWishes(response);
      } catch (error) {
        console.error(error.message);
      }
    };
    
    const addWish = async (title, points) => {
      setWishStatus("Adding...");
      try {
        const body = { title, points };
        const response = await fetch("http://localhost:3001/wishes/createwish", {
          method: "POST",
          headers: { "Content-Type": "application/json", token: localStorage.token },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        setNewWishes(parseRes);
        toast(`😃 ${title} added to wish list!`);
        audioAddWish.play();
        setWishStatus("Add Wish Item");
      } catch (error) {
        console.error(error.message);
      }
    };

    const completeWish = (wish) => {
      audioSuccess.play();
      addToCartHandler(wish.title, wish.points);
      setWishes(wishes.filter((i) => i.id !== wish.id));
      toast(`🚀 ${wish.title} added to shopping cart! 🚀`);
    };

    const removeWish = async (wish) => {
      try {
        await fetch(
          `http://localhost:3001/wishes/deletewish/${wish}`,
          {
            method: "DELETE",
            headers: { token: localStorage.token },
          }
        );
        setWishes(wishes.filter((i) => i.id !== wish));
        setNewWishes(wishes.filter((i) => i.id !== wish));
        const wishName = wishes.find((wishesObj) => wishesObj.wish_id === wish).wish_name;
        toast(`😢 ${wishName} removed from wish list!`);
        audioFailure.play();
      } catch (error) {
        console.error(error.message);
      }
    };

    useEffect(() => {
      getAllWishes();
    }, [newWishes]);
    
    return (
        <WishesContext.Provider value={{ wishes, addWish, completeWish, removeWish, wishStatus }}>
        {children}
        </WishesContext.Provider>
    );
};

export const useWishes = () => useContext(WishesContext);