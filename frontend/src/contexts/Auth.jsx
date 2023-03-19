import React, { useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { API_URL } from '../Config';

const UserContext = React.createContext();

function getLoggedInUser() {
  return localStorage.getItem("token") || undefined;
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(getLoggedInUser);
  const [isLoggedIn, setIsLoggedIn] = useState(getLoggedInUser(user !== undefined));
  const [name, setName] = useState("");
  const loginStatuses = {
    INITIAL: 'Sign In',
    LOADING: 'Loading...',
    SUCCESS: 'Success!',
    ERROR: 'Error',
  }

  const resgisterStatuses = {
    INITIAL: 'Sign Up',
    LOADING: 'Loading...',
    SUCCESS: 'Success!',
    ERROR: 'Error',
  }

  const [loginStatus, setLoginStatus] = useState(loginStatuses.INITIAL);
  const [registerStatus, setRegisterStatus] = useState(resgisterStatuses.INITIAL);

  const getProfile = async () => {
    try {
      const res = await fetch(`${API_URL.userProfile}`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseData = await res.json();
      localStorage.setItem("User Name", parseData.user_name);
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  useEffect(() => {
    setIsLoggedIn(isLoggedIn);
  }, [user, setIsLoggedIn, isLoggedIn]);


  const login = async (email, password) => {
    setLoginStatus(loginStatuses.LOADING);
    try {
      const body = { email, password };
      const response = await fetch(`${API_URL.login}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setUser(parseRes.token);
        setIsLoggedIn(true);
        setLoginStatus(loginStatuses.SUCCESS);
        toast.success("Logged in successfully");
        setLoginStatus(loginStatuses.INITIAL);
      } else {
        setLoginStatus(loginStatuses.ERROR);
        toast.error(parseRes);
        setLoginStatus(loginStatuses.INITIAL);
      }
    } catch (err) {
      console.error(err.message);
      toast.error(" Server Error 😠 ");
    }
  };

  const handleLogOut = useCallback(() => {
    toast(`Goodbye ${name}`, {
      icon: "💩",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("User Name");
    setUser(undefined);
    setIsLoggedIn(false);
    window.location = "/";
  }, [setIsLoggedIn, setUser, name]);

   useEffect(() => {
     const handleBeforeUnload = () => {
       handleLogOut();
     };
     window.addEventListener("beforeunload", handleBeforeUnload);
     return () => {
       window.removeEventListener("beforeunload", handleBeforeUnload);
     };
   }, [handleLogOut]);

  const register = async (name, email, password) => {
    setRegisterStatus(resgisterStatuses.LOADING);
    try {
      const body = { name, email, password };
      const response = await fetch(`${API_URL.register}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
        const parseRes = await response.json();
        if (parseRes.token) {
        setRegisterStatus(resgisterStatuses.SUCCESS);
        toast.success(`${name} registered successfully`);
        setTimeout(() => {
          window.location = "/";
        }, 2000);
        setRegisterStatus(resgisterStatuses.INITIAL);
      } else {
        setRegisterStatus(resgisterStatuses.ERROR);
        toast.error(parseRes);
        setRegisterStatus(resgisterStatuses.INITIAL);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <UserContext.Provider value={{user, name, isLoggedIn: user !== undefined, login, handleLogOut, register, loginStatus, registerStatus}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);