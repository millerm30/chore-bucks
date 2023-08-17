import React from "react";
import { GoTrash } from "react-icons/go";

export const CartItem = ({ wish, removeFromCartHandler }) => {

  return (
    <div
      key={wish.wish_id}
      className="container flex flex-col w-fill justify-between items-center py-2 mx-auto border-b-2 border-blue-900"
    >
      <span className="container flex justify-between py-2 px-2">
        <h2 className="text-left text-md">Wish: {wish.wish_name}</h2>
        <button
          onClick={() => removeFromCartHandler(wish.wish_id)}
          className="text-2xl text-red-600"
        >
          <GoTrash />
        </button>
      </span>
      <span className="container flex justify-end my-auto px-2">
        <h2 className="text-md">
          ChoreBucks: 💰{wish.wish_value}
        </h2>
      </span>
    </div>
  );
}

export default CartItem;