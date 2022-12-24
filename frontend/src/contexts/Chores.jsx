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

  const getChoresToComeplete = async () => {
    try {
      const getChores = await fetch(
        "http://localhost:3001/chores/getallchores",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
        }
      );
      const response = await getChores.json();
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getChoresToComeplete();
  }, []);

  const addChore = async () => {
     try {
       //const body = "0a2b33f0-c592-4f5a-a564-7f3562eaea4a";
       const response = await fetch(
         "http://localhost:3001/chores/addtodochore",
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             token: localStorage.token,
           },
           body: JSON.stringify({
             predefined_id: "0470f01d-d6b4-4e00-ad66-393c52a9379a",
             points: 10,
           }),
         }
       );
       const parseRes = await response.json();
       console.log(parseRes);
       setChores([...chores, parseRes]);
     } catch (error) {
       console.error(error.message);
     }
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

 

  return (
    <ChoresContext.Provider value={{ chores, addChore, removeChore, completeChore }}>
      {children}
    </ChoresContext.Provider>
  );
};

export const useChores = () => useContext(ChoresContext);