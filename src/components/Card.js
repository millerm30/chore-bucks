import React from 'react'

export const Card = ({title, points, style, remove, children}) => {
  return (
    <div className="bg-[#f8f8f8] w-full px-2 py-1 mt-5 flex flex-col justify-start items-center border-2 rounded-lg" style={style}>
        <button className="text-2xl text-red-600 self-end">{remove}</button>
        <h2 className="text-2xl font-semibold p-1 text-center">{title}</h2>
        <h3 className="text-lg font-semibold p-1 text-center">💰{points} Points</h3>
        {children}
    </div>
    
  )
}

export default Card