import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import Scroll from "./Scroll";

const Layout = ({ points }) => {
  return (
    <>
      <Header points={points} />
      <Navigation />
      <Outlet />
      <Scroll />
      <Footer />
      <Toaster />
    </>
  );
}

export default Layout