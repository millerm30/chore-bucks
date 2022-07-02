import React from "react";
import {v4 as uuid} from "uuid";
import Wishadd from "./Wishadd";
import { GoTrashcan } from "react-icons/go";
import { useWishes } from "../contexts/Wishes";

const WishList = () => {
  const { wishes, addWish, completeWish, removeWish, createRandomBackGroundColors } = useWishes();

  return (
    <main>
      <Wishadd addWish={addWish} />
      {wishes.length === 0 && (
        <p className="text-center italic pt-4">No Wish List Items!</p>
         )}
      {
      <section className="grid grid-cols-2 gap-5 py-5 mx-5 md:grid-cols-3 lg:grid-cols-4">
        {wishes.map((wish) => (
          <div key={uuid()} className="bg-[#f8f8f8] w-full px-2 py-1 mt-5 flex flex-col justify-start items-center border-2 rounded-lg" style={{ borderColor: createRandomBackGroundColors() }}>
            <button
              onClick={() => removeWish(wish)}
              className="text-2xl text-red-600 self-end">
              <GoTrashcan />
            </button>
            <h2 className="text-xl font-semibold p-1 text-center">{wish.title}</h2>
            <h3 className="text-lg font-semibold p-1 text-center">💰{wish.points} Points</h3>
            <button
                 onClick={() => completeWish(wish)}
                 className="bg-blue-400 mb-4 self-center px-4 py-2 border-2 border-blue-600 rounded-lg hover:bg-blue-500">
                   Add To Cart
                 </button>
          </div>
        ))}
      </section>
      }
    </main>
  );
}

export default WishList