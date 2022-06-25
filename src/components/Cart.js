import React from "react";
import { useShopping } from "../contexts/Shopping";
import {v4 as uuid} from "uuid";

const Cart = ({ points }) => {

  const { addToCart } = useShopping();
   
  return (
    <main className="text-center">
      <section className="pt-10 mb-12">
        <h2 className="text-2xl font-semibold p-1">🧒 Shopping Cart 🚀</h2>
        <p className="mb-5">Complete your purchase!</p>
      </section>
      <section className="container mx-auto">
        <h2 className="text-2xl font-semi-bold p-1">
          Available Chore Bucks 💰{points}
        </h2>
        {addToCart.length === 0 && (
           <p className="italic pt-4">No items add to your cart!</p>
         )}
        {
        <div className="w-full mx-auto grid grid-cols-2 grid-rows-2 mt-10 lg:w-1/2">
          {addToCart.map((wish) => (
            <div
              key={uuid()}
              className="bg-white w-full px-2 py-1 flex flex-col justify-start items-center border-2 border-blue-400 rounded-lg"
            >
              <h2 className="text-md md:text-xl py-3">{wish}</h2>
              <h2 className="text-md md:text-xl py-3">💰{wish}</h2>
              <button className="bg-blue-400 mt-5 self-center px-4 py-2 border-2 border-blue-600 rounded-lg hover:bg-blue-500">
                Purchase
              </button>
            </div>
          ))}
        </div>
        } 
      </section>
    </main>
  );
}

export default Cart