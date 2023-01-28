import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useShopping } from "./Shopping";
import success from "../sounds/success.mp3";
import negative from "../sounds/icqdelete.mp3";
import yay from "../sounds/yay.mp3";
import { useUser } from "./Auth";
import { API_URL } from "../Config";

const WishesContext = React.createContext();

let audioAddWish = new Audio(success);
let audioFailure = new Audio(negative);
let audioSuccess = new Audio(yay);

export function WishesProvider({ children }) {
    const { addToCartHandler, cartTotal } = useShopping();
    const [wishes, setWishes] = useState([]);
    const [newWishes, setNewWishes] = useState([]);
    const [wishStatus, setWishStatus] = useState("Add Wish Item");
    const [completeStatus, setCompleteStatus] = useState("Add To Cart");
    const { user } = useUser();
    
    const getAllWishes = async () => {
      try {
        const getWishes = await fetch(`${API_URL.wishes}`, {
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
        const response = await fetch(`${API_URL.addWish}`, {
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

    const completeWish = async (wish) => {
      setCompleteStatus("Adding to cart...");
      try {
        const body = { wish_id: wish.wish_id };
        const response = await fetch(`${API_URL.completeWish}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", token: localStorage.token },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        addToCartHandler(parseRes);
        toast(`🚀 ${wish.wish_name} added to shopping cart! 🚀`);
        audioSuccess.play();
        
        const updateBody = { wish_id: wish.wish_id, completed: true };
        const updateResponse = await fetch(`${API_URL.updateWishState}/${wish.wish_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", token: localStorage.token },
          body: JSON.stringify(updateBody),
        });
        const parseUpdateRes = await updateResponse.json();
        setNewWishes(parseUpdateRes);
        setWishes(wishes.filter((i) => i.id !== wish.id));
        setCompleteStatus("Add To Cart");
      } catch (error) {
        console.error(error.message);
      }
    };

    const removeWish = async (wish) => {
      try {
        await fetch(
          `${API_URL.removeWishItem}/${wish}`,
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
      if (user)
      getAllWishes();
    }, [newWishes, user, cartTotal]);
    
    return (
      <WishesContext.Provider
        value={{
          wishes,
          addWish,
          completeWish,
          newWishes,
          removeWish,
          wishStatus,
          completeStatus,
          getAllWishes,
        }}
      >
        {children}
      </WishesContext.Provider>
    );
};

export const useWishes = () => useContext(WishesContext);