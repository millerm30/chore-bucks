import React, { useContext, useState, useEffect } from "react";

const UserContext = React.createContext();

const userList = {
   "Guest": {
    displayName: "Guest",
    password: "guest",
   } 
};
 
const getUsers = () => {
    const users = localStorage.getItem("users");
    if (userList) {
        return JSON.parse(users);
    }
    return userList;
};

export function UserProvider({ children }) {
    const [users, setUsers] = useState(getUsers);

    const signInGuestUser = () => {
        alert("This feature is on the way! Chceck back soon!");
    };

    useEffect(() => {
        const temp = JSON.stringify(userList);
        localStorage.setItem("users", temp)
    },[users]);

    return (
        <UserContext.Provider value={{ users, signInGuestUser }}>
        {children}
        </UserContext.Provider>
    );
    }

export const useUser = () => useContext(UserContext);