import React, {useContext, useState, useEffect} from "react";
import toast from "react-hot-toast";
import success from "../sounds/success.mp3";
import tada from "../sounds/tada.mp3";
import failure from "../sounds/failure.mp3";

const ChoresContext = React.createContext();

let audioAddChore = new Audio(success);
let audioSuccess = new Audio(tada);
let audioFailure = new Audio(failure);

export function ChoresProvider({ children, addPoints}) {
  const [chores, setChores] = useState([]);
  const [newChores, setNewChores] = useState([]);
  const [choreStatus, setChoreStatus] = useState("Add Chore Item");

  const getChoresToComeplete = async () => {
    try {
      const getChores = await fetch("http://localhost:3001/chores/getallchores", {
        method: "GET",
        headers: {"Content-Type": "application/json", token: localStorage.token },
      });
      const response = await getChores.json();
      setChores(response)
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addChore = async ( chore_name, points ) => {
    setChoreStatus("Adding...");
    try {
      const body = { chore_name, points };
      console.log(body);
       const response = await fetch(
         "http://localhost:3001/chores/addtodochore",
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             token: localStorage.token,
           },
           body: JSON.stringify(body),
         }
       );
      audioAddChore.play();
      const parseRes = await response.json();
      setChores([...chores, parseRes]);
      setChoreStatus("Add Chore Item");
     } catch (error) {
       console.error(error.message);
     }
   };

  const removeChore = async (chore) => {
    try {
      await fetch(`http://localhost:3001/chores/deletechore/${chore}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });
      setChores(chores.filter((c) => c !== chore));
      setNewChores(newChores.filter((c) => c !== chore));
      audioFailure.play();
      toast(`🍩 Chore removed from chores list!`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const completeChore = (chore) => {
    audioSuccess.play();
    toast(`👏 ${chore.title} Completed. Good Job! 💸`);
    addPoints(chore.points)
    setChores(chores.filter((c) => c !== chore));
  };

  useEffect(() => {
    getChoresToComeplete();
  }, [newChores]);

  return (
    <ChoresContext.Provider value={{ chores, choreStatus, setChoreStatus, addChore, removeChore, completeChore }}>
      {children}
    </ChoresContext.Provider>
  );
};

export const useChores = () => useContext(ChoresContext);