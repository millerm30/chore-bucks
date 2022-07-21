import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast"

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

const useAuth = () => {
  const [user, setUser] = useState(getLoggedInUser);
  
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
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    window.location.pathname = "/chore-bucks";
  };
  return [ user, login ];
};

const handleLogOut = () => {
  localStorage.removeItem("user");
  window.location.pathname = "/chore-bucks";
};

export function UserProvider({ children }) {
  const [user, login] = useAuth();

  return (
    <UserContext.Provider value={{ user, login, handleLogOut }}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);