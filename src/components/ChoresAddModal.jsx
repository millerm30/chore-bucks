import React, { useState, useEffect, Fragment } from "react";
import { useChores } from "../contexts/Chores";
import choresChoices from "./Chorelist";
import toast from "react-hot-toast";
import { v4 as uuid } from 'uuid';
import { Dialog, Transition } from '@headlessui/react'
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const getInitialNewChoresLocalStorage = () => {
  const temp = localStorage.getItem("choresList");
  if (temp) {
    return JSON.parse(temp);
  }
  return choresChoices;
};

export default function MyModal() {
  let [isOpen, setIsOpen] = useState(true)
  const { addChore } = useChores();
  const [choresList, setChoresList] = useState(getInitialNewChoresLocalStorage);
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/chores");
  };

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
    setChoresList([...choresList,{ label: label, value: label, id: uuid()}]);
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
                    <main className="text-center bg-blue-300">
                      <section className="pt-2">
                        <h2 className="text-3xl font-semibold py-1">
                          🙂 Add chores! 🚀
                        </h2>
                        <p className="text-center">
                          Add your chores below to start earning points!
                        </p>
                      </section>
                      <section className="pt-5">
                        <form
                          onSubmit={handleSubmit}
                          className="flex flex-col w-full mx-auto"
                        >
                          <label htmlFor="chores" className="mb-1 text-left">
                            Choose your chore:{""}
                          </label>
                          <select
                            value={chore}
                            name="chores"
                            onChange={handleChoresChange}
                            className="rounded-md py-2 border mb-2 border-blue-700 outline-none"
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
                            className="rounded-md p-2 border border-blue-700 outline-none w-1/2"
                          ></input>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="submit"
                            disabled={!chore}
                            className={`bg-blue-900 my-4 self-center px-4 py-2 text-white font-bold rounded-lg ${
                              !chore
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            Add Chore
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
                                Add new chore:
                              </label>
                              <input
                                value={label}
                                maxLength="100"
                                placeholder="Enter new chore..."
                                name="choresNew"
                                onChange={(e) => setLabel(e.target.value)}
                                className="rounded-md py-2 px-2 border border-blue-700 outline-none w-full mb-2"
                              ></input>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="submit"
                                disabled={!label}
                                onClick={handleNewChore}
                                className={`bg-blue-900 my-4 self-center px-4 py-2 text-white font-bold rounded-lg ${
                                  !label
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                                }`}
                              >
                                Add New Chore
                              </motion.button>
                            </form>
                          </div>
                        </div>
                      </section>
                    </main>
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
