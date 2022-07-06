import React from "react";
import { useChores } from "../contexts/Chores";
import { GoTrashcan } from "react-icons/go";

const Chores = () => {

  const {chores, removeChore, completeChore, createRandomBackGroundColors} = useChores();

   return (
     <main className="text-center bg-blue-300">
        <section className="pt-10 mb-12">
         <h2 className="text-3xl font-semibold p-1">🧒 Chore Area 🚀</h2>
         <p className="mb-5">Complete chores to build points!</p>
        </section>
        <section className="choresArea">
         {chores.length === 0 && (
           <p className="italic pt-4">No Chores to do!</p>
         )}
         {
           <section className="grid grid-cols-2 gap-5 mx-5 py-5 md:grid-cols-3 lg:grid-cols-4">
             {chores.map((chore) => (
               <div key={Math.random()} className="bg-[#f8f8f8] w-full px-2 py-1 flex flex-col justify-start items-center border-2 rounded-lg" style={{ borderColor: createRandomBackGroundColors() }}>
                 <button
                   onClick={() => removeChore(chore)}
                   className="text-2xl text-red-600 self-end">
                   <GoTrashcan />
                 </button>
                 <h2 className="text-md md:text-xl py-3">{chore.chore}</h2>
                 <h2 className="text-md md:text-xl py-3">💰{chore.points} Points</h2>                                  
                 <button
                 onClick={() => completeChore(chore)}
                 className="bg-blue-900 my-4 self-center px-4 py-2 text-white font-bold rounded-lg">
                   Complete
                 </button>
               </div>
             ))}
           </section>
         }
       </section>
     </main>
   );
}

export default Chores;