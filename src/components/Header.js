import React from "react";
import { Link } from "react-router-dom";
import AppLogo from "../assets/appLogo.png";
import { FiShoppingCart } from "react-icons/fi";
import { useShopping } from "../contexts/Shopping";

const Header = ({ points }) => {
  const { cart } = useShopping();
  return (
    <header className="container flex justify-between mx-auto min-w-full pt-0.5 bg-gray-100">
      <div className="flex content-center">
        <img src={AppLogo} alt="" className="w-16 md:block"/>
        <h1 className="self-center"><span className="text-3xl text-blue-800 font-bold">Chore</span><span className="text-3xl text-green-800 font-bold">Bucks</span></h1>
      </div>
      <div className="flex flex-col items-center my-auto">
          <Link to="/cart"><FiShoppingCart className="text-3xl text-black pt-1" /></Link>
          {cart.length > 0 && <h2 className="absolute ml-8 text-xs bg-red-500 text-white px-2 rounded-xl">{cart.length}</h2>}
        <span className="flex mt-2 pr-2">
          <p className="text-center font-semibold">{points}</p>
          <p className="ml-1">Points</p>
        </span>
      </div>
    </header>
  )
}

export default Header