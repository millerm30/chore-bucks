import React, {useState, useEffect} from "react";
import {v4 as uuid} from "uuid";
import Wishadd from "./Wishadd";
import { GoTrashcan } from "react-icons/go";
import toast from "react-hot-toast";

function getInitialWishes() {
  const store = localStorage.getItem("wish");
  const savedWishes = JSON.parse(store);
  return savedWishes || [];
};

const WishList = () => {
  const [wishes, setWishes] = useState(getInitialWishes);

  const addWish = (title, points) => {
    toast.success(`${title} added to wish list!`);
    setWishes([...wishes, {title, points, id: uuid()}])
  }

  const completeWish = (wish) => {
    toast.success(`${wish.title} added to shopping cart!`);
    setWishes(wishes.filter((i) => i.id !== wish.id));
  }

   const removeWish = (wish) => {
     toast.error(`${wish.title} removed from wish list!`);
     setWishes(wishes.filter((i) => i !== wish));
   };

  useEffect(() => {
    const store = JSON.stringify(wishes)
    localStorage.setItem("wish", store)
  }, [wishes])

  return (
    <main className="wishList">
      <Wishadd addWish={addWish} />
      {wishes.length === 0 && (
        <p className="text-center italic pt-4">No Wish List Items!</p>
         )}
      {
      <section className="wishes grid grid-cols-2 gap-5 py-5 mx-5 md:grid-cols-3 lg:grid-cols-4">
        {wishes.map((wish) => (
          <div key={uuid()} className="wish bg-[#f8f8f8] w-full px-2 py-1 mt-5 flex flex-col justify-start items-center border-2 border-blue-400 rounded-lg">
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