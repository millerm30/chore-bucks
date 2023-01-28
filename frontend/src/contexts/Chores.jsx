import React, {useContext, useState, useEffect} from "react";
import toast from "react-hot-toast";
import success from "../sounds/success.mp3";
import tada from "../sounds/tada.mp3";
import failure from "../sounds/failure.mp3";
import { useUser } from "./Auth";
import { API_URL } from "../Config";

const ChoresContext = React.createContext();

let audioAddChore = new Audio(success);
let audioSuccess = new Audio(tada);
let audioFailure = new Audio(failure);

export function ChoresProvider({ children, addPoints}) {
  const [chores, setChores] = useState([]);
  const [newChores, setNewChores] = useState([]);
  const [choreStatus, setChoreStatus] = useState("Add Chore Item");
  const [completeChoreStatus, setCompleteChoreStatus] = useState("Complete Chore");
  const { user } = useUser();
  const [ choreViews, setChoreViews ] = useState([]);

  const getChoresToComeplete = async () => {
    try {
      const getChores = await fetch(`${API_URL.chores}`, {
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
         `${API_URL.addChore}`,
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
      await fetch(`${API_URL.deleteChore}/${chore}`, {
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

  const completeChore = async (chore) => {
    setCompleteChoreStatus("Completing...");
    try {
      const body = { chore_value: chore.chore_value };
      await fetch(`${API_URL.addMoneyToWallett}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });
      audioSuccess.play();
      toast(`👏 ${chore.chore_name} Completed. Good Job! 💸`);
      addPoints(chore.chore_value)

      const updateBody = { selected_id: chore.selected_id, completed: true };
      const updateResponse = await fetch(`${API_URL.completeChore}/${chore.selected_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
          },
          body: JSON.stringify(updateBody),
        });
      const updateParseRes = await updateResponse.json();
      setChores([...chores, updateParseRes])
      setChores(chores.filter((c) => c !== chore));
      setCompleteChoreStatus("Complete Chore");
    }
    catch (error) {
      console.error(error.message);
    }
  };

  const getChoreViews = async () => {
    try {
      const getChores = await fetch(`${API_URL.choreViews}`, {
        method: "GET",
        headers: {"Content-Type": "application/json", token: localStorage.token },
      });
      const response = await getChores.json();
      setChoreViews(response)
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
    getChoresToComeplete();
    }
  }, [newChores, user]);

  return (
    <ChoresContext.Provider value={{ chores, choreStatus, setChoreStatus, completeChoreStatus, addChore, removeChore, completeChore, choreViews, getChoreViews, setChoreViews }}>
      {children}
    </ChoresContext.Provider>
  );
};

export const useChores = () => useContext(ChoresContext);