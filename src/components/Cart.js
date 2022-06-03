import React from "react";

const Cart = ({ points }) => {
   
  return (
    <main className="cartContainer text-center">
      <section className="cartInfo pt-10 mb-12">
         <h2 className="text-2xl font-semibold p-1">🧒 Shopping Cart 🚀</h2>
         <p className="mb-5">Complete your purchase!</p>
      </section>
      <section>
        <h2 className="text-2xl font-semi-bold p-1">Current Chore Bucks ${points}</h2>
      </section>
      <section>
        
      </section>
    </main>
  )
}

export default Cart