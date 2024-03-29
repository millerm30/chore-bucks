import React, { useState, useEffect } from "react";
import { useShopping } from "../contexts/Shopping";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import CartItem from "./Cartitem";

const Cart = ({ points }) => {
  const { cart, getInitalCart, removeFromCartHandler, purchaseCartHandler, cartTotal, calculateCartTotal } = useShopping();
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    getInitalCart();
    calculateCartTotal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="text-center bg-blue-300">
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
      <section className="pt-10 mb-12">
        <h2 className="text-3xl font-semibold p-1">🧒 Shopping Cart 🚀</h2>
        <p>Complete your purchase!</p>
      </section>
      <section className="container mx-auto">
        <h2 className="text-2xl font-semi-bold p-1">
          Available Chore Bucks 💰{points}
        </h2>
        {cart.length === 0 ? (
          <p className="italic pt-4">No items added to your cart!</p>
        ) : (
          <div className="w-4/5 mx-auto mt-10 rounded-lg bg-white md:w-1/2 lg:w-1/3">
            <div className="w-full bg-blue-900 rounded-t">
              <h2 className="text-left text-md p-2 text-white">Wish Items</h2>
            </div>
            {cart.map((item) => (
              <CartItem
                key={item.wish_id}
                wish={item}
                removeFromCartHandler={removeFromCartHandler}
              />
            ))}
            {cart.length === 0 ? null : (
              <span className="container flex justify-between w-full rounded-b bg-blue-900">
                <h2 className="text-left text-md text-white p-2">Cart Total:</h2>
                <h2 className="text-md text-white p-2">💰 {cartTotal}</h2>
              </span>
            )}
          </div>
        )}
        <div className="container flex flex-col justify-center w-3/4 items-center py-3 mx-auto md:w-1/2 lg:w-1/3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={cart.length === 0}
            onClick={() => {
              purchaseCartHandler();
              if (points >= cart.reduce((acc, curr) => acc + curr.points, 0))
                setIsActive(true);
            }}
            className={`${"bg-blue-900 my-4 self-center px-4 py-2 text-white font-bold rounded-lg"} ${
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
