import React, { useState, useEffect } from 'react';
import { useChores } from '../contexts/Chores';
import { Link } from 'react-router-dom';
import { IoIosReturnLeft } from 'react-icons/io';

const ChoresView = () => {
  const { choreViews, getChoreViews } = useChores()

  const showPagination = () => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(choreViews.length / choresPerPage); i++) {
      pageNumbers.push(i)
    }

    return (
      <div>
        <ul className="flex justify-center">
          {pageNumbers.map((number) => (
            <li key={number} className="mx-1">
              <button
                onClick={() => paginate(number)}
                className="bg-gray-300 hover:bg-blue-400 text-black font-bold py-1 px-2 rounded"
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [choresPerPage] = useState(10)

  const indexOfLastChore = currentPage * choresPerPage
  const indexOfFirstChore = indexOfLastChore - choresPerPage
  const currentChores = choreViews.slice(
    indexOfFirstChore,
    indexOfLastChore
  )

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  useEffect(() => {
    getChoreViews()
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
        {choreViews.length === 0 ? (
          <p className="italic pt-4 text-center">No Chore History!</p>
        ) : (
          <div className="grid grid-cols-1 grid-rows-1 w-full ml-auto mr-auto md:w-3/4 lg:w-1/2">
            <table className="my-10 table-fixed">
              <thead className="text-sm">
                <tr>
                  <th
                    className="px-8 py-2 text-left bg-gray-300 rounded-tl-xl rounded-tr-xl"
                    colSpan={3}
                  >
                    {showPagination()}
                  </th>
                </tr>
                <tr>
                  <th className="px-8 py-2 text-left bg-white w-1/3">
                    Chore Name
                  </th>
                  <th className="px-8 py-2 text-center bg-white">
                    Point Value
                  </th>
                  <th className="px-8 py-2 text-right bg-white">
                    Completed Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white text-xs">
                {currentChores.map((chore) => (
                  <tr key={chore.selected_id} className="hover:bg-blue-300">
                    <td className="px-8 py-2">
                      {chore.chore_name
                        .split("_")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.substring(1)
                        )
                        .join(" ")}
                    </td>
                    <td className="px-8 py-2 text-center">
                      {chore.chore_value}
                    </td>
                    <td className="px-8 py-2 text-right">
                      {chore.date_completed}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="text-sm">
                <tr>
                  <td className="px-8 py-2 font-semibold text-left bg-white">
                    Points Earned
                  </td>
                  <td className="px-8 py-2 font-semibold text-center bg-white">
                    {currentChores.reduce(
                      (total, chore) => total + chore.chore_value,
                      0
                    )}
                  </td>
                  <td className="px-8 py-2 bg-white text-right font-semibold"></td>
                </tr>
                <tr>
                  <td className="px-8 py-2 font-semibold text-left bg-gray-300 rounded-bl-xl">
                    Total Points
                  </td>
                  <td className="px-8 py-2 font-semibold text-center bg-gray-300">
                    {choreViews.reduce(
                      (total, chore) => total + chore.chore_value,
                      0
                    )}
                  </td>
                  <td className="px-8 py-2 bg-gray-300 rounded-br-xl text-right font-semibold">
                    Page - {currentPage}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default ChoresView