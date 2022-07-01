import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "tw-elements";
import Layout from "./components/Layout";
import HeroPage from "./components/Hero";
import ChoresPage from "./components/Chores";
import ChoresaddPage from "./components/Choresadd";
import WishlistPage from "./components/Wishlist";
import App from "./App";
import Cart from "./components/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));

function getBucksFromLocalStorage() {
  const points = localStorage.getItem("points");
  if (points) {
    return Number(points);
  }
  return 0;
};

const Main = () => {
  const [points, setPoints] = useState(() => getBucksFromLocalStorage());

  const addPoints = (amount) => setPoints(points + amount);
  const removePoints = (amount) => setPoints(points - amount);

  useEffect(() => {
    localStorage.setItem("points", points);
  } , [points]);

return(
  <App points={points} addPoints={addPoints} removePoints={removePoints}>
    <BrowserRouter basename="/chore-bucks">
      <Routes>
        <Route path="/" element={<Layout points={points}/>}>
          <Route path="" element={<HeroPage />} />
          <Route path="/chores" element={<ChoresPage />} />
          <Route path="/choresadd" element={<ChoresaddPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<Cart points={points}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </App>
);
};

root.render(<Main />);
