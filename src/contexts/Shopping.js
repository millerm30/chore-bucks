import React, {useContext, useState} from "react";
import toast from "react-hot-toast";
import {v4 as uuid} from "uuid";

const ShoppingContext = React.createContext();

export function ShoppingProvider({ children }) {
    const [shopping, setShopping] = useState();
    
    const addShopping = (item, points) => {
        toast.success(`${item} added to shopping list!`);
        setShopping([...shopping, { id: uuid(), item, points }]);
    };
    
    const removeShopping = (item) => {
        toast.error(`${item.item} removed from shopping list!`);
        setShopping(shopping.filter((c) => c !== item));
    };
    
    const completeShopping = (item) => {
        toast(`${item.item} Completed. Good Job!`, {
        icon: "👏"
        });
        setShopping(shopping.filter((c) => c !== item));
    };
    
    return (
        <ShoppingContext.Provider value={{ shopping, addShopping, removeShopping, completeShopping }}>
        {children}
        </ShoppingContext.Provider>
    );
}

export const useShopping = () => useContext(ShoppingContext);