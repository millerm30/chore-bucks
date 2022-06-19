import React from "react";
import { Link } from "react-router-dom";
import AppLogo from "../assets/appLogo.png";
import { FiShoppingCart } from "react-icons/fi";

const Header = ({ points }) => {
  return (
    <header className="headerContainer container flex justify-between mx-auto min-w-full pt-0.5 bg-gray-100">
      <div className="appLogo flex content-center">
        <img src={AppLogo} alt="" className="hidden w-16 md:block"/>
        <h1 className="self-center"><span className="text-3xl text-blue-800 font-bold">Chore</span><span className="text-3xl text-green-800 font-bold">Bucks</span></h1>
      </div>
      <div className="shoppingBasket flex flex-col items-center my-auto">
        <Link to="/cart"><FiShoppingCart className="text-3xl text-yellow-600 mr-3" /></Link>
        <span className="flex pointsValue mt-2 pr-2">
          <p className="text-center font-semibold">{points}</p>
          <p className="ml-1">Points</p>
        </span>
      </div>
    </header>
  )
}

export default Header