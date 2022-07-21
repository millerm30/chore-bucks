import React, { useState } from "react";
import { useShopping } from "../contexts/Shopping";
import { GoTrashcan } from "react-icons/go";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const CartItem = ({ wish, removeFromCartHandler }) => (
  <div
    key={wish.id}
    className="container flex flex-col w-4/5 justify-between items-center py-3 mx-auto border-b-2 border-gray-600"
  >
    <span className="container flex justify-between py-2">
      <h2 className="text-left text-lg">Wish: {wish.title}</h2>
      <button
        onClick={() => removeFromCartHandler(wish)}
        className="text-2xl text-red-600"
      >
        <GoTrashcan />
      </button>
    </span>
    <span className="container flex justify-end my-auto mt-0">      
      <h2 className="text-md">ChoreBucks: 💰{wish.points}</h2>
    </span>
  </div>
);

const Cart = ({ points }) => {
  const { cart, removeFromCartHandler, purchaseCartHandler, cartTotal } = useShopping();
  const [isActive, setIsActive] = useState(false);

  return (
    <main className="text-center bg-blue-300">
      <section className={isActive ? " isActive" : ""}>
        {isActive && (
        <Confetti
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
      <section className="pt-10 mb-12">
        <h2 className="text-3xl font-semibold p-1">🧒 Shopping Cart 🚀</h2>
        <p className="mb-5">Complete your purchase!</p>
      </section>
      <section className="container mx-auto">
        <h2 className="text-2xl font-semi-bold p-1">
          Available Chore Bucks 💰{points}
        </h2>
        {cart.length === 0 && (
          <p className="italic pt-4">No items added to your cart!</p>
        )}
        {cart.length === 0 ? null : (
          <div className="w-4/5 mx-auto mt-10 pb-5 rounded-lg bg-white md:w-1/2 lg:w-1/3">
            {cart.map((wish) => (
              <CartItem
                key={wish.id}
                wish={wish}
                removeFromCartHandler={removeFromCartHandler}
              />
            ))}
          </div>
        )}
        <div className="container flex flex-col justify-center w-3/4 items-center py-3 mx-auto md:w-1/2 lg:w-1/3">
          {cart.length === 0 ? null : (
            <span className="container flex justify-between w-4/5">
              <h2 className="text-left text-md">Cart Total:</h2>
              <h2 className="text-md">💰 {cartTotal}</h2>
            </span>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={cart.length === 0}
            onClick={() => {
              setIsActive(true);
              purchaseCartHandler();
            }
            }
            className={`bg-blue-900 my-4 self-center px-4 py-2 text-white font-bold rounded-lg ${
              cart.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            Purchase
          </motion.button>
        </div>
      </section>
    </main>
  );
};

export default Cart;
