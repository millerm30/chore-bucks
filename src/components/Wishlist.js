import React, {useState, useEffect} from 'react'
import {v4 as uuid} from 'uuid'
import Wishadd from './Wishadd';

const Wishlist = () => {
  const [wishes, setWishes] = useState(getInitialWishes());

  const addWish = (title, points) => {
    setWishes([...wishes, {title, points, id: uuid()}])
  }

  useEffect(() => {
    const store = JSON.stringify(wishes)
    localStorage.setItem('wish', store)
  })

  function getInitialWishes() {
    const store = localStorage.getItem('wish')
    const savedWishes = JSON.parse(store)
    return savedWishes || []
  }

  return (
    <div className="wishList mb-20">
      <Wishadd addWish={addWish} />
      <div className="wishes grid grid-cols-2 gap-5 py-5 mx-5 md:grid-cols-3 lg:grid-cols-4">
        {wishes.map((wish) => (
          <div key={uuid()} className="wish bg-[#f8f8f8] w-full px-2 py-1 mt-5 flex flex-col justify-start items-center border-2 border-blue-400 rounded-lg">
            <h2 className='text-xl font-semibold p-1 text-center'>{wish.title}</h2>
            <h3 className='text-lg font-semibold p-1 text-center'>💰{wish.points} Points</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist