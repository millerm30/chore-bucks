import React from "react";
import AppLogo from "../assets/appLogo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useShopping } from "../contexts/Shopping";
import { useUser } from "../contexts/Auth";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = ({ points }) => {
  const { cart } = useShopping();
  const { user } = useUser();
  const navigate = useNavigate();
  const goToShoppingCart = () => {
    navigate("/cart");
  };

  return (
    <header className="container flex flex-col mx-auto min-w-full py-0.5 bg-gray-100">
      <div className="container flex justify-between min-w-full">
        <div className="flex content-center ml-2">
          <img src={AppLogo} alt="" className="w-14 md:block"/>
          <h1 className="self-center"><span className="text-3xl text-blue-800 font-bold">Chore</span><span className="text-3xl text-green-800 font-bold">Bucks</span></h1>
        </div>
        <div className="flex flex-col items-center my-auto mr-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToShoppingCart}
            >
            <AiOutlineShoppingCart className="text-4xl text-black pt-1 mx-auto" />
            </motion.button>
          {cart.length > 0 && <h2 className="absolute text-xs ml-7 bg-red-500 border-white text-white px-1.5 py-0.5 rounded-xl">{cart.length}</h2>}
          <span className="flex pr-2">
            <p className="text-center font-semibold">{points}</p>
            <p className="ml-1">Points</p>
          </span>  
        </div>
      </div>
      <div className="flex flex-row self-end mr-4">
        <h2>Welcome!</h2>
        <h2 className="ml-1">{user.username}</h2>
      </div>
    </header>
  )
}

export default Header