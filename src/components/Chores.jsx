import React, { useState } from "react";
import { useChores } from "../contexts/Chores";
import { GoTrashcan } from "react-icons/go";
import Card from "./Card";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Confetti from "react-confetti";

const Chores = () => {
  const { chores, removeChore, completeChore } = useChores();
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();
  const goToAddChoresLink = () => {
    navigate("/choresadd");
  };

  return (
    <main className="text-center bg-blue-300">
        {isActive && (
        <Confetti
          style={{ pointerEvents: "none", width: "100%", height: "100%" }}
          numberOfPieces={isActive ? 500 : 0}
          recycle={false}
          onConfettiComplete={(confetti) => {
            setIsActive(false);
            confetti.reset();
          }}
        />
        )}
      <section className="pt-10 mb-6">
        <h2 className="text-3xl font-semibold p-1">🧒 Chore Area 🚀</h2>
        <p className="mb-5">Complete chores to build points!</p>
      </section>
      <section>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={goToAddChoresLink}
          className="bg-blue-900 my-4 self-center px-4 py-2 text-white font-bold rounded-lg"
        >
          Add Chores
        </motion.button>
      </section>
      <Outlet />
      <section className="choresArea">
        {chores.length === 0 && <p className="italic pt-4">No Chores to do!</p>}
        {
          <section className="grid grid-cols-2 gap-5 mx-5 py-5 md:grid-cols-3 lg:grid-cols-4">
            {chores.map((chore) => (
              <Card
                key={chore.id}
                style={chore.style}
                title={chore.title}
                points={chore.points}
                remove={<GoTrashcan onClick={() => removeChore(chore)} />}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    completeChore(chore);
                    setIsActive(!isActive);
                  }}
                  className="bg-blue-900 my-4 self-center px-4 py-2 text-white font-bold rounded-lg"
                >
                  Complete
                </motion.button>
              </Card>
            ))}
          </section>
        }
      </section>
    </main>
  );
}

export default Chores;