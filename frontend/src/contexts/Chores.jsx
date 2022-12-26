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
    } catch (error) {
      console.error(error.message);
    }
  };

  const addChore = async ( predefined_id, points ) => {
    setChoreStatus("Adding...");
    try {
      const body = { predefined_id, points };
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
      setNewChores([...chores, parseRes]);
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
      setNewChores(chores.filter((c) => c !== chore));
      const choreName = chores.find((choreObj) => choreObj.selected_id === chore).chore_name;
      toast(`${choreName} Removed. 😢`);
      audioFailure.play();
    } catch (error) {
      console.error(error.message);
    }
  };

  // create a completeChore function that will add the chore_value to the users points balance in their wallet

  const completeChore = async (chore) => {
    try {
      const body = { chore_value: chore.chore_value };
      const response = await fetch(`http://localhost:3001/wallet/addbalance`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      setNewChores([...chores, parseRes]);
      audioSuccess.play();
      toast(`👏 ${chore.chore_name} Completed. Good Job! 💸`);
      addPoints(chore.chore_value)
      setChores(chores.filter((c) => c !== chore));
    }
    catch (error) {
      console.error(error.message);
    }
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