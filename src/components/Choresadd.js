import React, { useState } from 'react'
import { useChores } from '../contexts/Chores'
import choresChoices from './Chorelist'

const Hero = () => {
  const { addChore } = useChores();

  const [ chore, setChore ] = useState('');
  const [ point, setPoint] = useState('');

  const handleChoresChange = (e) => {
    setChore(e.target.value);
  };

  const handlePointChange = (e) => {
    setPoint(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addChore(chore, point);
    setChore('')
    setPoint('')
  };
  
  return (
    <div className="choreaddContainer text-center mb-24">
      <div className="appInfo pt-10">
        <h2 className="text-2xl font-semibold p-1">
          🙂 Add your chores below! 🚀
        </h2>
      </div>
      <div className="myForm pt-5">
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
      </div>
    </div>
  );
};

export default Hero;
