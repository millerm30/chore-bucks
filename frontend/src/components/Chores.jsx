import React, { useState } from "react";
import { useChores } from "../contexts/Chores";
import { GoTrashcan } from "react-icons/go";
import Card from "./Card";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import { MdOutlineHistoryEdu } from "react-icons/md";

const Chores = () => {
  const { chores, removeChore, completeChore } = useChores();
  const [isActive, setIsActive] = useState(false);
  const { completeChoreStatus } = useChores();

  const navigate = useNavigate();
  const goToAddChoresLink = () => {
    navigate("/choresadd");
  };

  return (
    <main className="text-center bg-blue-300">
      <div className="pt-2 flex justify-center">
        <ul className="flex flex-row justify-center w-full pl-0 list-style-none mr-auto">
          <li className="px-2 hover:text-gray-700 uppercase cursor-pointer relative">
            <Link
              to="/choresview"
              className="flex after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#FF9950] after:transition-all after:ease-in-out after:hover:scale-x-100"
            >
              <MdOutlineHistoryEdu className="text-2xl" />
              Chore History
            </Link>
          </li>
        </ul>
      </div>
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
        <p>Complete chores to earn ChoreBucks!</p>
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
        {chores.every((chore) => chore.completed === true) ? (
          <p className="italic pt-4">No Chores to complete!</p>
        ) : (
          <section className="grid grid-cols-2 gap-5 mx-5 py-5 md:grid-cols-4 lg:grid-cols-6">
            {chores
              .filter((chore) => chore.completed === false)
              .map((chore) => (
                <Card
                  key={chore.selected_id}
                  style={chore.style}
                  title={chore.chore_name}
                  points={chore.chore_value}
                  remove={
                    <GoTrashcan
                      onClick={() => removeChore(chore.selected_id)}
                    />
                  }
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
                    {completeChoreStatus}
                  </motion.button>
                </Card>
              ))}
          </section>
        )}
      </section>
    </main>
  );
};

export default Chores;