import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWishes } from "../contexts/Wishes";
import { FaGifts } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";


const WishAdd = ({ addWish }) => {
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState("");
  const [isActive, setIsActive] = useState(false);
  const { wishStatus } = useWishes();

  const handleSubmit = (e) => {
      e.preventDefault()
      setIsActive(true)
      addWish(title, Number(points))
      setTitle("")
      setPoints("")
  };
  
  return (
    <section className="container mx-auto pt-10">
      {isActive && (
        <Confetti
          style={{ pointerEvents: "none", width: "100%", height: "100%" }}
          numberOfPieces={isActive ? 500 : 0}
          recycle={false}
          onConfettiComplete={(confetti) => {
            setIsActive(false);
            confetti.reset();
          }}
        />
      )}
      <section>
        <h1 className="text-3xl font-semibold p-1 text-center">
          😉 Wish List! 👍
        </h1>
        <p className="text-center">
          Add items to your wish list that you would like to build your
          ChoreBucks to purchase!
        </p>
      </section>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/4 mx-auto md:w-1/3"
      >
        <label className="text-left mt-5">Wish Item:</label>
        <div className="flex flex-row bg-blue-700 border-2 border-blue-700 rounded">
          <div className="flex self-center mx-1">
            <FaGifts className="text-white text-2xl" />
          </div>
          <input
            onChange={(e) => setTitle(e.target.value)}
            name="wish_name"
            value={title}
            type="text"
            maxLength="100"
            required
            placeholder="Enter your wish item..."
            className="w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none rounded"
          />
        </div>
        <label className="text-left mt-4">ChoreBucks Value:</label>
        <div className="flex flex-row bg-blue-700 border-2 border-blue-700 rounded mb-4 w-1/2">
          <div className="flex self-center mx-1">
            <RiMoneyDollarCircleFill className="text-white text-2xl" />
          </div>
          <input
            onChange={(e) => setPoints(e.target.value)}
            name="wish_value"
            value={points}
            type="number"
            min="0"
            required
            placeholder="Enter ChoreBucks value..."
            className="w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none rounded"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={!title || !points}
          className={`${"bg-blue-900 my-4 self-center px-4 py-2 text-white font-bold rounded-lg"} ${
            !title || !points
              ? "opacity-40 cursor-not-allowed"
              : "curson-pointer"
          }`}
          value="add wish"
        >
          {wishStatus}
        </motion.button>
      </form>
    </section>
  );
}

export default WishAdd