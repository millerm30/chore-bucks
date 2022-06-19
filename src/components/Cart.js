import React from "react";

const Cart = ({ points }) => {
   
  return (
    <main className="cartContainer text-center">
      <section className="cartInfo pt-10 mb-12">
        <h2 className="text-2xl font-semibold p-1">🧒 Shopping Cart 🚀</h2>
        <p className="mb-5">Complete your purchase!</p>
      </section>
      <section className="container mx-auto">
        <h2 className="text-2xl font-semi-bold p-1">
          Available Chore Bucks 💰{points}
        </h2>
        <div className="prizeContainer w-full mx-auto grid grid-cols-2 grid-rows-2 mt-10 lg:w-1/2">
          <div className="col-1">
            <h2 className="text-2xl font-semibold p-1 text-center">Prize:</h2>
          </div>
          <div className="col-2">
            <h2 className="text-2xl p-1 text-left">Item Description</h2>
          </div>
          <div className="col-1">
            <h2 className="text-2xl font-semibold p-1 text-center">Price:</h2>
          </div>
          <div className="col-2">
            <h2 className="text-2xl p-1 text-left">$$$</h2>
          </div>
        </div>
        <button className="bg-blue-400 mt-5 self-center px-4 py-2 border-2 border-blue-600 rounded-lg hover:bg-blue-500">
          Purchase
        </button>
      </section>
    </main>
  );
}

export default Cart