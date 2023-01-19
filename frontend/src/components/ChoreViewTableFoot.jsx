import React from 'react'

const ChoreViewTableFoot = ({ currentChores, currentPage, choreViews }) => {
  return (
    <tfoot className="text-sm">
      <tr>
        <td className="p-2 font-semibold text-left bg-white" colSpan={2}>
          Chores Completed
        </td>
        <td className="p-2 font-semibold text-right bg-white">
          {choreViews.length}
        </td>
      </tr>
      <tr>
        <td className="p-2 font-semibold text-left bg-gray-300 rounded-bl-xl">
          Total Points
        </td>
        <td className="p-2 font-semibold text-left bg-gray-300">
          {choreViews.reduce((total, chore) => total + chore.chore_value, 0)}
        </td>
        <td className="p-2 bg-gray-300 rounded-br-xl text-right font-semibold">
          Page - {currentPage}
        </td>
      </tr>
    </tfoot>
  );
}

export default ChoreViewTableFoot