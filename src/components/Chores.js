import React from 'react';
import { useChores } from '../contexts/Chores';
import { GoTrashcan } from "react-icons/go";

const Chores = () => {

  const {chores, removeChore, completeChore} = useChores();

   return (
     <div className="choresContainer text-center">
       <div className="appInfo pt-10">
         <h2 className="text-2xl font-semibold p-1">🧒 Chore Area 🚀 </h2>
         <p className="mb-5">Complete chores to build points!</p>
         {chores.length === 0 && (
           <p className="italic pt-4">No Chores to do!</p>
         )}
         {
           <div className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-3 lg:grid-cols-4">
             {chores.map((chore) => (
               <div key={Math.random()} className="bg-[#f8f8f8] w-full px-2 py-1 flex flex-col justify-start items-center border-2 border-blue-400 rounded-lg">
                 <button
                   onClick={() => removeChore(chore)}
                   className="text-2xl text-red-600 self-end">
                   <GoTrashcan />
                 </button>
                 <h2 className="choreName text-md md:text-xl py-3">{chore.chore}</h2>                 
                 <button
                 onClick={() => completeChore(chore)}
                 className="bg-blue-400 mb-4 self-center px-4 py-2 border-2 border-blue-600 rounded-lg hover:bg-blue-500">
                   Complete
                 </button>
               </div>
             ))}
           </div>
         }
       </div>
     </div>
   );
}

export default Chores;