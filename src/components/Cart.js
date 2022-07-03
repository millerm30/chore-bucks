import React from "react";
import { useShopping } from "../contexts/Shopping";
import { v4 as uuid } from "uuid";
import { GoTrashcan } from "react-icons/go";

const Cart = ({ points }) => {

  const { cart, removeFromCartHandler, purchaseCartHandler } = useShopping();
   
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
        {cart.length === 0 && (
          <p className="italic pt-4">No items added to your cart!</p>
        )}
        {
          <div className="w-full mx-auto mt-10">
            {cart.map((wish) => (
              <div
                key={uuid()}
                className="container flex flex-col w-3/4 justify-between w-full items-center py-3 mx-auto border-b-2 border-gray-600 md:w-1/2 lg:w-1/3"
              >
                <span className="container flex justify-between py-2">
                  <h2 className="text-left text-md">Wish: {wish.title}</h2>
                  <button
                    onClick={() => removeFromCartHandler(wish)}
                    className="text-2xl text-red-600"
                  >
                    <GoTrashcan />
                  </button>
                </span>
                <span className="my-auto mt-0 self-end">
                  <h2 className="text-md">ChoreBucks: 💰{wish.points}</h2>
                </span>
              </div>
            ))}
          </div>
        }
          <div className="container flex flex-col justify-center w-3/4 items-center py-3 mx-auto md:w-1/2 lg:w-1/3">
            <span className="container flex justify-between">
              <h2 className="text-left text-md">Cart Total:</h2>
              <h2 className="text-md">💰 {cart.reduce((acc, curr) => acc + curr.points, 0)}</h2>
            </span>
            <button
              disabled={cart.length === 0}
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