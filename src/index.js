import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "tw-elements";
import Layout from "./components/Layout";
import HeroPage from "./components/Hero";
import ChoresPage from "./components/Chores";
import WishlistPage from "./components/Wishlist";
import ModalAdd from "./components/ChoresAddModal";
import App from "./App";
import Cart from "./components/Cart";
import Login from "./components/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));

function getBucksFromLocalStorage() {
  const points = localStorage.getItem("points");
  if (points) {
    return Number(points);
  }
  return 0;
};

function getLoggedInUser() {
  const user = localStorage.getItem("user");

  if (user === null) {
    return undefined;
  } else {
    return JSON.parse(user);
  }
};

const AppRouter = () => {
  const [points, setPoints] = useState(() => getBucksFromLocalStorage());
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const user = getLoggedInUser();
    if (user) {
      return true;
    }
    return false;
  }
  );

  useEffect(() => {
    setIsLoggedIn(() => {
      const user = getLoggedInUser();
      if (user) {
        return true;
      }
      return false;
    }
    );
  }, [setIsLoggedIn]);

  const addPoints = (amount) => setPoints(points + amount);
  const removePoints = (amount) => setPoints(points - amount);

  useEffect(() => {
    localStorage.setItem("points", points);
  } , [points]);

  return(
  <App points={points} addPoints={addPoints} removePoints={removePoints}>
    <BrowserRouter basename="/chore-bucks">
      <Routes>
        {isLoggedIn ? ( 
        <Route path="/" element={<Layout points={points}/>}>
          <Route path="" element={<HeroPage />} />
          <Route path="/chores" element={<ChoresPage />} />
            <Route path="/choresadd" element={<ModalAdd />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<Cart points={points}/>} />
        </Route>
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  </App>
);
};

const Main = () => {

 return (
    <AppRouter >
      <App />
    </AppRouter>
  );
};

root.render(<Main />);
