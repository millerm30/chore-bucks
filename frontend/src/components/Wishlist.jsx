import React from "react";
import Wishadd from "./Wishadd";
import { GoTrashcan } from "react-icons/go";
import { useWishes } from "../contexts/Wishes";
import Card from "./Card";
import { motion } from "framer-motion";

const WishList = () => {
  const { wishes, addWish, completeWish, removeWish, completeStatus } = useWishes();

  return (
    <main className="bg-blue-300">
      <Wishadd addWish={addWish} />
      {wishes.length === 0 ? (
        <p className="text-center italic pt-4">No wishes yet</p>
      ) : (
        <section className="grid grid-cols-2 gap-5 py-5 mx-5 md:grid-cols-3 lg:grid-cols-4">
          {wishes.map((wish) => (
            <Card
              key={wish.wish_id}
              title={wish.wish_name}
              points={wish.wish_value}
              remove={<GoTrashcan onClick={() => removeWish(wish.wish_id)} />}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => completeWish(wish)}
                className="bg-blue-900 my-4 px-4 py-2 text-white font-bold rounded-lg"
              >
                {completeStatus}
              </motion.button>
            </Card>
          ))}
        </section>
      )}
    </main>
  );
}

export default WishList