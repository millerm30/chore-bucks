import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useShopping } from "../contexts/Shopping";
import { useUser } from "../contexts/Auth";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AppImage from "../assets/chorebucks.png";
import { FcCurrencyExchange } from "react-icons/fc";

const Header = ({ points }) => {
  const { cart } = useShopping();
  const { name } = useUser();
  const navigate = useNavigate();

  const goToShoppingCart = () => {
    navigate("/cart");
  };

  return (
    <header className="container flex flex-col mx-auto min-w-full py-0.5 bg-gray-100">
      <div className="container flex justify-between min-w-full">
        <div className="flex content-center ml-2">
          <FcCurrencyExchange className="text-4xl" />
          <img
            src={AppImage}
            alt="Chore Bucks"
            className="mt-2 w-2/5 h-3/6 md:w-3/12 md:h-3/6 lg:w-2/12 lg:h-3/6"
          />
        </div>
        <div className="flex flex-col items-end my-auto mr-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToShoppingCart}
          >
            <AiOutlineShoppingCart className="text-4xl text-black pt-1 mr-1" />
          </motion.button>
          {cart.length > 0 && (
            <h2 className="absolute text-xs ml-7 bg-red-500 border-white text-white px-1.5 py-0.5 rounded-xl">
              {cart.length}
            </h2>
          )}
          <span className="flex pr-2">
            <p className="text-center font-semibold">{String(points)}</p>
            <p className="ml-1">ChoreBucks</p>
          </span>
        </div>
      </div>
      <div className="flex flex-row self-end mr-4">
        <h2>Welcome!</h2>
        <h2 className="ml-1">{name}</h2>
      </div>
    </header>
  );
}

export default Header