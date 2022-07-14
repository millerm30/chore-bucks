import React from 'react'

export const Card = ({title, points, style, remove, children}) => {
  return (
    <div className="bg-[#f8f8f8] w-full px-2 py-1 mt-5 flex flex-col justify-center border-2 rounded-lg" style={style}>
      <div className='container h-full flex flex-col justify-between'>
        <span>
          <button className="text-2xl text-red-600 block mr-0 ml-auto py-1">{remove}</button>
          <h2 className="text-2xl font-semibold p-1 text-center">{title}</h2>
          <h3 className="text-lg font-semibold p-1 text-center">💰{points} Points</h3>
        </span>
        <span className="mx-auto">
          {children}
        </span>
      
      </div>
    </div>
    
  )
}

export default Card