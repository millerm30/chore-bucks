import React from "react";
import { GoTrashcan } from "react-icons/go";

export const CartItem = ({ wish, removeFromCartHandler }) => {
  /*const [wishQuantity, setWishQuantity] = useState(1);

  const calculateNewWishTotal = (wish) => {
    return wish.points * wishQuantity;
  };*/

  return (
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
      <span className="container flex justify-end my-auto">
        {/*}
        <span>
          <label htmlFor="wishQuantity">Quantity:</label>
          <select 
            id="wishQuantity"
            className="border-2 border-gray-600 rounded ml-2"
            value={wishQuantity}
            onChange={(e) => setWishQuantity(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </span>
        */}
        <span>
          <h2 className="text-md">ChoreBucks: 💰{wish.points}</h2>
        </span>
      </span>
    </div>
  );
}

export default CartItem;