import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const WishAdd = ({ addWish }) => {
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e) => {
      e.preventDefault()
      setIsActive(true)
      addWish(title, Number(points))
      setTitle("")
      setPoints("")
  };
  
  return (
    <section className="container mx-auto pt-10">
      <section className={isActive ? " isActive" : ""}>
        {isActive && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ pointerEvents: "none" }}
          numberOfPieces={isActive ? 500 : 0}
          recycle={false}
          onConfettiComplete={(confetti) => {
            setIsActive(false);
            confetti.reset();
          }}
        />
        )}
      </section>
      <section>
        <h1 className="text-3xl font-semibold p-1 text-center">
          😉 Wish List! 👍
        </h1>
        <p className="text-center">
          Add items to your wish list that you would like to build your points
          to purchase!
        </p>
      </section>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/4 mx-auto md:w-1/3"
      >
        <label className="text-left mt-5">Add Wish Item:</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          maxLength="100"
          required
          placeholder="Enter your wish item..."
          className="rounded-md py-2 px-2 border border-blue-700 outline-none w-full mb-2"
        ></input>
        <label className="text-left">Add Point Value:</label>
        <input
          onChange={(e) => setPoints(e.target.value)}
          value={points}
          type="number"
          min="0"
          required
          placeholder="Enter point value..."
          className="rounded-md py-2 px-2 border border-blue-700 outline-none w-1/2"
        ></input>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={!title || !points}
          className={`bg-blue-900 my-4 self-center px-4 py-2 text-white font-bold rounded-lg ${
            !title || !points
              ? "opacity-40 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          value="add wish"
        >
          Add Wish Item
        </motion.button>
      </form>
    </section>
  );
}

export default WishAdd