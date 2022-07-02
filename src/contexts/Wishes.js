import React, { useContext, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import { useShopping } from '../contexts/Shopping';

const WishesContext = React.createContext();

const localStorageKey = "wishList";

function getInitialWishes() {
  return localStorage.getItem(localStorageKey)
    ? JSON.parse(localStorage.getItem(localStorageKey))
    : [];
}

export function WishesProvider({ children }) {
    const { addToCartHandler } = useShopping();
    const [wishes, setWishes] = useState(getInitialWishes);

    const addWish = (title, points) => {
      toast.success(`${title} added to wish list!`);
      setWishes([...wishes, { title, points, id: uuid() }]);
    };

    const completeWish = (wish) => {
        addToCartHandler(wish.title, wish.points);
        setWishes(wishes.filter((i) => i.id !== wish.id));
        toast.success(`${wish.title} added to shopping cart! 🚀`);
    };

    const removeWish = (wish) => {
      toast.error(`${wish.title} removed from wish list!`);
      setWishes(wishes.filter((i) => i !== wish));
    };

    useEffect(() => {
      const store = JSON.stringify(wishes);
      localStorage.setItem("wishList", store);
    }, [wishes]);
    
    return (
        <WishesContext.Provider value={{ wishes, addWish, completeWish, removeWish }}>
        {children}
        </WishesContext.Provider>
    );
};

export const useWishes = () => useContext(WishesContext);