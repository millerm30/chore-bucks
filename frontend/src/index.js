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
import Register from "./components/Register";
import ContactForm from "./components/ContactForm";
import ChoresView from "./components/ChoresView";
import { UserProvider, useUser } from "./contexts/Auth";
import { API_URL } from "./Config";

const root = ReactDOM.createRoot(document.getElementById("root"));

const getBucksFromDataBase = async () => {
  try {
  const response = await fetch(`${API_URL.getBalance}`, {
    method: "GET",
    headers: { "content-type": "application/json", token: localStorage.token },
  });
  const parseRes = await response.json();
  return parseRes.length === 0 || undefined ? 0 : Number(parseRes[0].balance);
  } catch (err) {
    console.error(err.message);
  }
};

const Router = () => {
  const [points, setPoints] = useState(0);
  const { isLoggedIn } = useUser();
  
  const addPoints = (amount) => setPoints(points + amount);
  const removePoints = (amount) => setPoints(points - amount);

  useEffect(() => {
    if (isLoggedIn) {
      getBucksFromDataBase().then((value) => setPoints(value));
    }
  }, [isLoggedIn]);
   
  return(
  <App points={points} addPoints={addPoints} removePoints={removePoints} >
    <BrowserRouter basename="/">
      <Routes>
        {isLoggedIn ? (
        <Route path="/" element={<Layout points={points} />}>
          <Route path="" element={<HeroPage />} />
          <Route path="/chores" element={<ChoresPage />} />
            <Route path="/choresadd" element={<ModalAdd />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/choresview" element={<ChoresView />} />
          <Route path="/cart" element={<Cart points={points}/>} />
          <Route path="/contact" element={<ContactForm />} />
        </Route>
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </App>
);
};

const Main = () => {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

root.render(<Main />);
