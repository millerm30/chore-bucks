import React, { useState } from "react";
import { useChores } from "../contexts/Chores";
import choresChoices from "./Chorelist";
import toast from "react-hot-toast";

const Choresadd = () => {
  const { addChore } = useChores();

  const [ chore, setChore ] = useState("");
  const [ point, setPoint] = useState("");
  const [ newchore, setnewChore] = useState([]);

  const handleChoresChange = (e) => {
    setChore(e.target.value);
  };

  const handlePointChange = (e) => {
    setPoint(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addChore(chore, Number(point));
    setChore("")
    setPoint("")
  };
  
  return (
    <main className="choreaddContainer text-center mb-24">
      <section className="appInfo pt-10">
        <h2 className="text-2xl font-semibold p-1">
          🙂 Add your chores below! 🚀
        </h2>
        <p className="text-center">
          Add your chores below to start earning points!
        </p>
      </section>
      <section className="myForm pt-5">
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
            {choresChoices.map((choice) => (
              <option key={choice.id} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
          <label htmlFor="chores" className="mb-1 text-left">
            Point value...
          </label>
          <input
            type="number"
            required
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
      <section>
        <div>
          <div className="appInfo pt-10">
            <h2 className="text-xl font-semibold p-1">
              Don't see your chore above? <br></br>Add it yourself!
            </h2>
          </div>
          <div className="myForm pt-5">
            <form className="flex flex-col w-3/4 mx-auto md:w-1/3">
              <label htmlFor="choresNew" className="mb-1 text-left">
                Add new chore:
              </label>
              <input
                value={newchore}
                name="choresNew"
                onChange={(e) => setnewChore(e.target.value)}
                className="rounded-md py-2 px-2 border border-blue-700 rounded outline-none w-full mb-2"
              ></input>
              <button
                type="submit"
                disabled={!newchore}
                onClick={() => {
                  choresChoices.concat({
                    id: choresChoices.length + 1,
                    value: newchore,
                    label: newchore,
                  });
                  setnewChore("");
                  toast(`${newchore} added to chore list!`,
                  { icon: "👍"});
                }}
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
};

export default Choresadd;
