import React from "react";
import { GoTrashcan } from "react-icons/go";

export const CartItem = ({ wish, removeFromCartHandler, updateCartItem }) => {

  //This function will need some work to make it work with the backend
  const calculateNewWishTotal = (wish) => {
    return wish.wish_value;
  };

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
      <span className="container flex justify-between my-auto">
        <span>
          <label htmlFor="wishQuantity">Quantity:</label>
          <select
            id="wishQuantity"
            className="border-2 border-gray-600 rounded ml-2"
            value={wish.quantity}
            onChange={(e) =>
              updateCartItem({ ...wish, quantity: Number(e.target.value) })
            }
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </span>
        <span>
          <h2 className="text-md">
            ChoreBucks: 💰{calculateNewWishTotal(wish)}
          </h2>
        </span>
      </span>
    </div>
  );
}

export default CartItem;