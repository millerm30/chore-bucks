import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const UserContext = React.createContext();

const users = {
  "Guest": {
    displayName: "Guest",
    password: "Guest",
  },
};

function getLoggedInUser() {
  const user = localStorage.getItem("user");

  if (user === null) {
    return undefined;
  } else {
    return JSON.parse(user);
  }
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(getLoggedInUser);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  const login = (username, password) => {
    const user = users[username];
    if (!user) {
      toast("User not found", {
        icon: "💩",
      });
      return;
    }
    const passwordCorrect = user.password === password;
    if (!passwordCorrect) {
      toast("Password is incorrect", {
        icon: "🤨",
      });
      return;
    }
    setIsLoggedIn(true);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    window.location.pathname = ("/chore-bucks");
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUser(undefined);
    setIsLoggedIn(false);
    window.location.pathname = ("/chore-bucks");
  };

  return (
    <UserContext.Provider value={{user, login, handleLogOut, isLoggedIn}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);