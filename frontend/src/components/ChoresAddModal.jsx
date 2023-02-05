import React, { useState, useEffect, Fragment } from "react";
import { useChores } from "../contexts/Chores";
import toast from "react-hot-toast";
import { Dialog, Transition } from '@headlessui/react'
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { API_URL } from "../Config";

export default function MyModal() {
  const { addChore, choreStatus } = useChores();
  const [choresList, setChoresList] = useState([]);
  const [newChoresList, setNewChoresList] = useState([]);
  const [addNewChoreStatus, setAddNewChoreStatus] = useState("Add New Chore");
  const navigate = useNavigate();
  const isOpen = true

  const goBack = () => {
    navigate("/chores");
  };

  const [chore, setChore] = useState("");
  const [point, setPoint] = useState("");
  const [choreName, setChoreName] = useState("");

  const getInitialDefinedChores = async () => {
    try {
      const response = await fetch(
        `${API_URL.predefinedChores}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
        }
      );
      const data = await response.json();
      setChoresList(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChoresChange = (e) => {
    setChore(e.target.value);
  };

  const handlePointChange = (e) => {
    setPoint(e.target.value);
  };

  const handleNewChore = async (e) => {
    setAddNewChoreStatus("Adding...");
    e.preventDefault();
    try {
      const body = { choreName };
      const response = await fetch(`${API_URL.addNewChore}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token: localStorage.token },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      setNewChoresList([...newChoresList, parseRes]);
      toast(`${choreName} added to chore list!`, { icon: "👍" });
      setChoreName("");
      setAddNewChoreStatus("Add New Chore");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addChore(chore, Number(point));
    const choreName = choresList.find((choreObj) => choreObj.predefined_id === chore).chore_name;
    toast(`${choreName} added to chore list!`, { icon: "👍" });
    setChore("");
    setPoint("");
  };

   useEffect(() => {
     getInitialDefinedChores();
   }, [newChoresList]);
   
  return (
    <>
      <main className="bg-blue-300">
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => null}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-blue-300 p-6 text-left align-middle shadow-xl transition-all">
                    <div className="text-center bg-blue-300">
                      <section className="pt-2">
                        <h2 className="text-3xl font-semibold py-1">
                          🙂 Add chores! 🚀
                        </h2>
                        <p className="text-center">
                          Add your chores below to start earning ChoreBucks!
                        </p>
                      </section>
                      <section className="pt-5">
                        <form
                          onSubmit={handleSubmit}
                          className="flex flex-col w-full mx-auto"
                        >
                          <label htmlFor="chores" className="mb-1 text-left">
                            Choose your chore:
                          </label>
                          <select
                            value={chore}
                            name="chores"
                            onChange={handleChoresChange}
                            className="rounded-md py-2 border mb-2 border-blue-700 outline-none"
                          >
                            {" "}
                            <option value="">Please select a chore...</option>
                            {choresList.map((chore) => (
                              <option
                                key={chore.predefined_id}
                                value={chore.predefined_id}
                              >
                                {chore.chore_name}
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
                            className="rounded-md p-2 border border-blue-700 outline-none w-1/2"
                          ></input>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="submit"
                            disabled={!chore}
                            className={`${"bg-blue-900 my-4 self-center px-4 py-2 text-white font-bold rounded-lg"} ${
                              !chore
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {choreStatus}
                          </motion.button>
                        </form>
                      </section>
                      <section className="pb-5">
                        <div>
                          <div className="pt-5">
                            <h2 className="text-xl font-semibold p-1">
                              Don't see your chore above? <br></br>Add it
                              yourself!
                            </h2>
                          </div>
                          <div className="pt-2">
                            <form className="flex flex-col w-full mx-auto">
                              <label
                                htmlFor="choresNew"
                                className="mb-1 text-left"
                              >
                                New chore:
                              </label>
                              <input
                                value={choreName}
                                maxLength="100"
                                placeholder="Enter new chore..."
                                name="choresNew"
                                onChange={(e) => setChoreName(e.target.value)}
                                className="rounded-md py-2 px-2 border border-blue-700 outline-none w-full mb-2"
                              ></input>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="submit"
                                disabled={!choreName}
                                onClick={handleNewChore}
                                className={`${"bg-blue-900 my-4 self-center px-4 py-2 text-white font-bold rounded-lg"} ${
                                  !choreName
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                                }`}
                              >
                                {addNewChoreStatus}
                              </motion.button>
                            </form>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div className="mt-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-black hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={goBack}
                      >
                        Close
                      </motion.button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </main>
    </>
  );
}
