import React from "react";
import { GoTrashcan } from "react-icons/go";

export const CartItem = ({ wish, removeFromCartHandler }) => {

  return (
    <div
      key={wish.wish_id}
      className="container flex flex-col w-4/5 justify-between items-center py-3 mx-auto border-b-2 border-gray-600"
    >
      <span className="container flex justify-between py-2">
        <h2 className="text-left text-lg">Wish: {wish.wish_name}</h2>
        <button
          onClick={() => removeFromCartHandler(wish.wish_id)}
          className="text-2xl text-red-600"
        >
          <GoTrashcan />
        </button>
      </span>
      <span className="container flex justify-end my-auto">
        <h2 className="text-md">
          ChoreBucks: 💰{wish.wish_value}
        </h2>
      </span>
    </div>
  );
}

export default CartItem;