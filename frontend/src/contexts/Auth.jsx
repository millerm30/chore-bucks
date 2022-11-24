import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const UserContext = React.createContext();

function getLoggedInUser() {
  const user = localStorage.getItem("token");
  if (user === null) {
    return undefined;
  } else {
    return user;
  }
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(getLoggedInUser);
  const [isLoggedIn, setIsLoggedIn] = useState(getLoggedInUser(user !== undefined));
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:3001/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseData = await res.json();
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, [name]);

  useEffect(() => {
    setIsLoggedIn(() => {
      const user = getLoggedInUser();
      if (user) {
        return true;
      }
      return false;
    });
  }, [setIsLoggedIn]);

  const login = async (email, password) => {
    //e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setUser(parseRes.token);
        toast.success("Logged in successfully");
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLogOut = () => {
    toast(`Goodbye ${name}`, {
      icon: "💩",
    });
    localStorage.removeItem("token");
    setIsLoggedIn(!isLoggedIn);
    setUser(undefined);
    window.location = "/";
  };

  return (
    <UserContext.Provider value={{user, name, isLoggedIn: user !== undefined, login, handleLogOut}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);