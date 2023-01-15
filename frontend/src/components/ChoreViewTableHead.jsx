import React, { useState } from "react"
import { BiDownArrow, BiUpArrow } from "react-icons/bi"

const ChoreViewTableHead = ({ columns, showPagination, handleSorting }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortChange = (accessor) => {
    const sortOrder = accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead className="text-sm">
      <tr>
        <th
          className="p-2 text-left bg-gray-300 rounded-tl-xl rounded-tr-xl"
          colSpan={3}
        >
          {showPagination}
        </th>
      </tr>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
           const cl = sortable
             ? sortField === accessor && order === "asc"
               ? "up"
               : sortField === accessor && order === "desc"
               ? "down"
               : "default"
             : "";
          return (
            <th
              key={accessor}
              className="p-2 text-left bg-white w-1/3 cursor-pointer"
              onClick={sortable ? () => handleSortChange(accessor) : null}
            > 
              {label}
              {sortable && (
                <span className="ml-2 inline-block">
                  {cl === "up" ? (
                    <BiUpArrow className="text-md text-red-600"/>
                  ) : cl === "down" ? (
                    <BiDownArrow className="text-md text-red-600" />
                  ) : (
                    <BiDownArrow className="text-md text-red-600" />
                  )}
                </span>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default ChoreViewTableHead