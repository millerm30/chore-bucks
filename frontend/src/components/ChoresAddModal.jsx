import React, { useState, useEffect, Fragment } from "react";
import { useChores } from "../contexts/Chores";
import toast from "react-hot-toast";
import { Dialog, Transition } from '@headlessui/react'
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

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
        "http://localhost:3001/chores/predefinedchores",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
      const response = await fetch("http://localhost:3001/chores/addpredefinedchore", {
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
    setChore("");
    setPoint("");
  };

   useEffect(() => {
     getInitialDefinedChores();
   }, [newChoresList]);

  const style = {
    mainContainer: `bg-blue-300`,
    transitionChild: `fixed inset-0 bg-black bg-opacity-25`,
    mainDivider: `fixed inset-0 overflow-y-auto`,
    secondDivider: `flex items-center justify-center p-4 text-center`,
    dialogPanel: `w-full max-w-md transform overflow-hidden rounded-2xl bg-blue-300 p-6 text-left align-middle shadow-xl transition-all`,
    dialogDivider: `text-center bg-blue-300`,
    sectionOne: `pt-2`,
    headingOne: `text-3xl font-semibold py-1`,
    paragraphOne: `text-center`,
    sectionTwo: `pt-5`,
    form: `flex flex-col w-full mx-auto`,
    chooseChoreLabel: `mb-1 text-left`,
    chooseChoreSelect: `rounded-md py-2 border mb-2 border-blue-700 outline-none`,
    pointsLabel: `mb-1 text-left`,
    pointsValueInput: `rounded-md p-2 border border-blue-700 outline-none w-1/2`,
    addChoreButton: `bg-blue-900 my-4 self-center px-4 py-2 text-white font-bold rounded-lg`,
    addNewChoreSection: `pb-5`,
    addNewChoreHeadingContainer: `pt-5`,
    headingTwo: `text-xl font-semibold p-1`,
    addNewChoreInputContainer: `pt-2`,
    addNewChoreForm: `flex flex-col w-full mx-auto`,
    addNewChoreLabel: `mb-1 text-left`,
    addNewChoreInput: `rounded-md py-2 px-2 border border-blue-700 outline-none w-full mb-2`,
    addNewChoreButton: `bg-blue-900 my-4 self-center px-4 py-2 text-white font-bold rounded-lg`,
    closeButton: `inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-black hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`,
  };

  return (
    <>
      <main className={style.mainContainer}>
        <Transition appear show={(isOpen)} as={Fragment}>
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
              <div className={style.transitionChild} />
            </Transition.Child>

            <div className={style.mainDivider}>
              <div className={style.secondDivider}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className={style.dialogPanel}>
                    <div className={style.dialogDivider}>
                      <section className={style.sectionOne}>
                        <h2 className={style.headingOne}>
                          🙂 Add chores! 🚀
                        </h2>
                        <p className={style.paragraphOne}>
                          Add your chores below to start earning points!
                        </p>
                      </section>
                      <section className={style.sectionTwo}>
                        <form
                          onSubmit={handleSubmit}
                          className={style.form}
                        >
                          <label htmlFor="chores" className={style.chooseChoreLabel}>
                            Choose your chore:
                          </label>
                          <select
                            value={chore}
                            name="chores"
                            onChange={handleChoresChange}
                            className={style.chooseChoreSelect}
                          > <option value="">Please select a chore...</option>
                            {choresList.map((chore) => (
                              <option 
                              key={chore.predefined_id} 
                              value={chore.predefined_id}
                              >
                                {chore.chore_name}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="chores" className={style.pointsLabel}>
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
                            className={style.pointsValueInput}
                          ></input>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="submit"
                            disabled={!chore}
                            className={`${style.addChoreButton} ${
                              !chore
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {choreStatus}
                          </motion.button>
                        </form>
                      </section>
                      <section className={style.addNewChoreSection}>
                        <div>
                          <div className={style.addNewChoreHeadingContainer}>
                            <h2 className={style.headingTwo}>
                              Don't see your chore above? <br></br>Add it
                              yourself!
                            </h2>
                          </div>
                          <div className={style.addNewChoreInputContainer}>
                            <form className={style.addNewChoreForm}>
                              <label
                                htmlFor="choresNew"
                                className={style.addNewChoreLabel}
                              >
                                Add new chore:
                              </label>
                              <input
                                value={choreName}
                                maxLength="100"
                                placeholder="Enter new chore..."
                                name="choresNew"
                                onChange={(e) => setChoreName(e.target.value)}
                                className={style.addNewChoreInput}
                              ></input>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="submit"
                                disabled={!choreName}
                                onClick={handleNewChore}
                                className={`${style.addNewChoreButton} ${
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
                        className={style.closeButton}
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
