import React from 'react';
import { useChores } from '../contexts/Chores';
import { Chorebucket } from './Chorebucket';
import { GoTrashcan } from "react-icons/go";


const Chores = () => {

  const {chores, removeChore} = useChores();

   return (
     <div className="choresContainer text-center">
       <div className="appInfo pt-10">
         <h2 className="text-2xl font-semibold p-1">Chore Area</h2>
         <p className="mb-5">Drop completed chores in the box</p>
         <Chorebucket />
         {chores.length === 0 && (
           <p className="italic pt-4">No Chores to do!</p>
         )}
         {
           <div className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-4">
             {chores.map((chore) => (
               <div className="bg-[#f8f8f8] w-full px-2 py-1 flex flex-col justify-start items-center border-2 border-blue-400 rounded-lg">
                 <button
                   onClick={() => removeChore(chore)}
                   className="text-2xl text-red-600 self-end"
                 >
                   <GoTrashcan />
                 </button>
                 <h2 className="choreName text-xl py-3">{chore}</h2>
               </div>
             ))}
           </div>
         }
       </div>
     </div>
   );
}

export default Chores;