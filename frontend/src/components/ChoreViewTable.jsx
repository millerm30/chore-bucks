import React, { useState } from 'react'
import ChoreViewTableHead from './ChoreViewTableHead'
import ChoreViewTableBody from './ChoreViewTableBody'
import ChoreViewTableFoot from './ChoreViewTableFoot'
import { useChores } from "../contexts/Chores";


const ChoreViewTable = () => {
  const { choreViews, setChoreViews } = useChores()

  const columns = [
    { label: "Chore Name", accessor: "chore_name", sortable: true },
    { label: "Point Value", accessor: "chore_value", sortable: true, },
    { label: "Completed Date", accessor: "date_completed", sortable: true },
  ]

  const showPagination = () => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(choreViews.length / choresPerPage); i++) {
      pageNumbers.push(i);
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
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [choresPerPage] = useState(10);

  const indexOfLastChore = currentPage * choresPerPage;
  const indexOfFirstChore = indexOfLastChore - choresPerPage;
  const currentChores = choreViews.slice(indexOfFirstChore, indexOfLastChore);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 const handleSorting = (sortField, sortOrder) => {
   if (sortField) {
     const sorted = [...choreViews].sort((a, b) => {
       if (a[sortField] === null) return 1;
       if (b[sortField] === null) return -1;
       if (a[sortField] === null && b[sortField] === null) return 0;
       return (
         a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
           numeric: true,
         }) * (sortOrder === "asc" ? 1 : -1)
       );
     });
     setChoreViews(sorted);
   }
 };

  return (
    <table className="my-10 table-fixed">
      <ChoreViewTableHead columns={columns} showPagination={showPagination()} handleSorting={handleSorting} />
      <ChoreViewTableBody columns={columns} currentChores={currentChores} />
      <ChoreViewTableFoot currentChores={currentChores} currentPage={currentPage} choreViews={choreViews} />
    </table>
  );
}

export default ChoreViewTable