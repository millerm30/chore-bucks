import React from "react";
import { useChores } from "../contexts/Chores";
import { GoTrashcan } from "react-icons/go";
import Card from "./Card";
import ChoresAddModal from "./ChoresAddModal";

const Chores = () => {

  const {chores, removeChore, completeChore} = useChores();

   return (
     <main className="text-center bg-blue-300">
       <section className="pt-10 mb-6">
         <h2 className="text-3xl font-semibold p-1">🧒 Chore Area 🚀</h2>
         <p className="mb-5">Complete chores to build points!</p>
       </section>
       <section>
          <ChoresAddModal />
       </section>
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
                 <button
                   onClick={() => completeChore(chore)}
                   className="bg-blue-900 my-4 self-center px-4 py-2 text-white font-bold rounded-lg"
                 >
                   Complete
                 </button>
               </Card>
             ))}
           </section>
         }
       </section>
     </main>
   );
}

export default Chores;