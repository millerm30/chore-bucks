import React from "react";
import { useShopping } from "../contexts/Shopping";
import {v4 as uuid} from "uuid";
import { GoTrashcan } from "react-icons/go";

const Cart = ({ points }) => {

  const { addToCart, removeFromCartHandler, purchaseCartHandler } = useShopping();
   
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
          <p className="italic pt-4">No items added to your cart!</p>
        )}
        {
          <div className="w-full mx-auto mt-10">
            {addToCart.map((wish) => (
              <div
                key={uuid()}
                className="container flex flex-row justify-center w-full items-center py-3 mx-auto"
              >
                <span>
                  <h2 className="text-left text-md md:text-xl">
                    Prize: {wish.title}
                  </h2>
                  <h2 className="text-md md:text-xl">Cost: 💰{wish.points}</h2>
                </span>
                <span className="my-auto mt-0">
                  <button
                    onClick={() => removeFromCartHandler(wish)}
                    className="text-2xl text-red-600"
                  >
                    <GoTrashcan />
                  </button>
                </span>
              </div>
            ))}
          </div>
        }
          <div className="container flex flex-col justify-center w-full items-center py-3 mx-auto">
            <span>
              <h2 className="text-left text-md md:text-xl underline">
                Cart Total: 💰
                {addToCart.reduce((acc, curr) => acc + curr.points, 0)}
              </h2>
            </span>
            <button
              disabled={addToCart.length === 0}
              onClick={purchaseCartHandler}
              className="bg-blue-400 my-4 self-center px-4 py-2 border-2 border-blue-600 rounded-lg hover:bg-blue-500">
              Purchase
            </button>
          </div>
      
      </section>
    </main>
  );
}

export default Cart