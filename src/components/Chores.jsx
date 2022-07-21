/* eslint-disable no-restricted-globals */
import React from "react";
import { useChores } from "../contexts/Chores";
import { GoTrashcan } from "react-icons/go";
import Card from "./Card";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import addChoreSound from "../sounds/icqdelete.mp3";

let addChoreAudio = new Audio(addChoreSound);

const Chores = () => {
  const {chores, removeChore, completeChore} = useChores();
  const navigate = useNavigate();
  const goToAddChoresLink = () => {
    navigate("/choresadd");
    addChoreAudio.play();
  };

   return (
     <main className="text-center bg-blue-300">
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
         {chores.length === 0 && (
           <p className="italic pt-4">No Chores to do!</p>
         )}
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
                   onClick={() => completeChore(chore)}
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