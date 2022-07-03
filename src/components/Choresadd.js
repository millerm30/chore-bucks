import React, { useState, useEffect } from "react";
import { useChores } from "../contexts/Chores";
import choresChoices from "./Chorelist";
import toast from "react-hot-toast";
import { v4 as uuid } from 'uuid';

const getInitialNewChoresLocalStorage = () => {
  const temp = localStorage.getItem("choresList");
  if (temp) {
    return JSON.parse(temp);
  }
  return choresChoices;
};

const ChoresAdd = () => {
  const { addChore } = useChores();
  const [choresList, setChoresList] = useState(getInitialNewChoresLocalStorage);

  const [chore, setChore] = useState("");
  const [point, setPoint] = useState("");
  const [label, setLabel] = useState("");

  const handleChoresChange = (e) => {
    setChore(e.target.value);
  };

  const handlePointChange = (e) => {
    setPoint(e.target.value);
  };

  const handleNewChore = (e) => {
    e.preventDefault();
    setChoresList([...choresList,{ label: label, value: label, id: uuid() },]);
    setLabel("");
    toast(`${label} added to chore list!`, { icon: "👍" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addChore(chore, Number(point));
    setChore("");
    setPoint("");
  };

  useEffect(() => {
    localStorage.setItem("choresList", JSON.stringify(choresList));
  }, [choresList]);

  return (
    <main className="text-center">
      <section className="pt-10">
        <h2 className="text-2xl font-semibold p-1">
          🙂 Add your chores below! 🚀
        </h2>
        <p className="text-center">
          Add your chores below to start earning points!
        </p>
      </section>
      <section className="pt-5">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-3/4 mx-auto md:w-1/3"
        >
          <label htmlFor="chores" className="mb-1 text-left">
            Choose your chore:{""}
          </label>
          <select
            value={chore}
            name="chores"
            onChange={handleChoresChange}
            className="rounded-md py-2 border mb-2 border-blue-700 rounded outline-none"
          >
            {choresList.map((choice) => (
              <option key={choice.id} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
          <label htmlFor="chores" className="mb-1 text-left">
            Point value:
          </label>
          <input
            type="number"
            required
            min={0}
            placeholder="Enter point value..."
            value={point}
            name="chores"
            onChange={handlePointChange}
            className="rounded-md p-2 border border-blue-700 rounded outline-none w-1/2"
          ></input>
          <button
            type="submit"
            disabled={!chore}
            className="bg-blue-400 mt-5 self-center px-4 py-2 border-2 border-blue-600 rounded-lg hover:bg-blue-500"
          >
            Add Chore
          </button>
        </form>
      </section>
      <section className="pb-5">
        <div>
          <div className="pt-10">
            <h2 className="text-xl font-semibold p-1">
              Don't see your chore above? <br></br>Add it yourself!
            </h2>
          </div>
          <div className="pt-5">
            <form className="flex flex-col w-3/4 mx-auto md:w-1/3">
              <label htmlFor="choresNew" className="mb-1 text-left">
                Add new chore:
              </label>
              <input
                value={label}
                placeholder="Enter new chore..."
                name="choresNew"
                onChange={(e) => setLabel(e.target.value)}
                className="rounded-md py-2 px-2 border border-blue-700 rounded outline-none w-full mb-2"
              ></input>
              <button
                type="submit"
                disabled={!label}
                onClick={handleNewChore}
                className="bg-blue-400 mt-5 self-center px-4 py-2 border-2 border-blue-600 rounded-lg hover:bg-blue-500"
              >
                Add New Chore
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};;

export default ChoresAdd;
