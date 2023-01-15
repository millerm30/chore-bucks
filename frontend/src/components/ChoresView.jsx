import React, { useState, useEffect } from 'react';
import { useChores } from '../contexts/Chores';
import { Link } from 'react-router-dom';
import { IoIosReturnLeft } from 'react-icons/io';
import ChoreViewTable from './ChoreViewTable';

const ChoresView = () => {
  const { choreViews, getChoreViews } = useChores()

  useEffect(() => {
    getChoreViews()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="bg-blue-300">
      <section className="mx-auto pt-10">
        <h1 className="text-3xl font-semibold p-1 text-center">
          🧒 Chore History 🚀
        </h1>
        <div className="flex justify-center">
          <li className="px-2 hover:text-gray-700 uppercase cursor-pointer relative list-none">
            <Link
              to="/chores"
              className="flex after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#FF9950] after:transition-all after:ease-in-out after:hover:scale-x-100"
            >
              <IoIosReturnLeft className="text-2xl" />
              Back to chores!
            </Link>
          </li>
        </div>
        <div>
        {choreViews.length === 0 ? (
          <p className="italic pt-4 text-center">No Chore History!</p>
        ) : (
          <div className="grid grid-cols-1 grid-rows-1 w-full ml-auto mr-auto md:w-3/4 lg:w-1/2">
            <ChoreViewTable />
          </div>
        )}
        </div>
      </section>
    </main>
  );
};

export default ChoresView