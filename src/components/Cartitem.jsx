import React from "react";
import { GoTrashcan } from "react-icons/go";

export const CartItem = ({ wish, removeFromCartHandler }) => (
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

export default CartItem;