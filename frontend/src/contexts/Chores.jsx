import React, {useContext, useState, useEffect} from "react";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
import success from "../sounds/success.mp3";
import tada from "../sounds/tada.mp3";
import failure from "../sounds/failure.mp3";

const ChoresContext = React.createContext();

let audioAddChore = new Audio(success);
let audioSuccess = new Audio(tada);
let audioFailure = new Audio(failure);

export function ChoresProvider({ children, addPoints}) {
  const [chores, setChores] = useState([]);

  const getInitialDefinedChores = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/chores/predefinedchores",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
      //console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addChore = (title, points) => {
    audioAddChore.play();
    toast(`👍 ${title} added to chores list!`);
    setChores([...chores, { id: uuid(), title, points }]);
  };

  const removeChore = (chore) => {
    audioFailure.play();
    toast(`🍩 ${chore.title} removed from chores list!`);
    setChores(chores.filter((c) => c !== chore));
  };

  const completeChore = (chore) => {
    audioSuccess.play();
    toast(`👏 ${chore.title} Completed. Good Job! 💸`);
    addPoints(chore.points)
    setChores(chores.filter((c) => c !== chore));
  };

  useEffect(() => {
    getInitialDefinedChores()
  }, []);

  return (
    <ChoresContext.Provider value={{ chores, addChore, removeChore, completeChore }}>
      {children}
    </ChoresContext.Provider>
  );
};

export const useChores = () => useContext(ChoresContext);