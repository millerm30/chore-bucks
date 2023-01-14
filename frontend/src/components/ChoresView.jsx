import React from 'react'
import { useChores } from '../contexts/Chores'

const ChoresView = () => {
  const { choreViews } = useChores()

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mt-5">Chores</h1>
          <table className="table mt-5 text-center">
            <thead>
              <tr>
                <th>Chore Name</th>
                <th>Point Value</th>
                <th>Completed Date</th>
              </tr>
            </thead>
            <tbody>
              {choreViews.map((chore) => (
                <tr key={chore.selected_id}>
                  <td>{chore.chore_name
                    .split('_')
                    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
                    .join(' ')}</td>
                  <td>{chore.chore_value}</td>
                  <td>{chore.date_completed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ChoresView