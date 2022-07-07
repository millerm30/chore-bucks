import React, { useContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

const UserContext = React.createContext();

function getInitialUsersLocalStorage() {
  const temp = localStorage.getItem("users");
  const savedUsers = JSON.parse(temp);
  return savedUsers || [];
};

export function UserProvider({ children }) {
    const [users, setUsers] = useState(getInitialUsersLocalStorage);

    const signInGuestUser = () => {
        alert ("This feature is on the way! Chceck back soon!");
    };

    useEffect(() => {
        const temp = JSON.stringify(users, "username: guest, password: guest");
        localStorage.setItem("users", temp)
    },[users]);

    return (
        <UserContext.Provider value={{ users, signInGuestUser }}>
        {children}
        </UserContext.Provider>
    );
    }

export const useUser = () => useContext(UserContext);