import React from 'react';

const ChoreViewTableBody = ({ currentChores, columns }) => {
  return (
    <tbody className="bg-white text-xs">
      {currentChores.map((choreView) => {
        return (
          <tr key={choreView.selected_id} className="hover:bg-blue-300">
            {columns.map(({ accessor }) => {
              const tData = choreView[accessor] ? choreView[accessor] : "——";
              return (
                <td key={accessor} className="p-2">
                  {tData}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

export default ChoreViewTableBody