import React, {useState} from 'react'
import {v4 as uuid} from 'uuid'
import Wishadd from './Wishadd';

const Wishlist = () => {
  const [wishes, setWishes] = useState([]);

  const addWish = (title, points) => {
    setWishes([...wishes, {title, points, id: uuid()}])
  }

  return (
    <div className="wishList">
      <Wishadd addWish={addWish} />
      <div className="wishes grid grid-cols-2 gap-5 py-5 mx-5 md:grid-cols-3 lg:grid-cols-4">
        {wishes.map((wish) => (
          <div key={uuid()} className="wish bg-[#f8f8f8] w-full px-2 py-1 flex flex-col justify-start items-center border-2 border-blue-400 rounded-lg">
            <h2>{wish.title}</h2>
            <h3>{wish.points}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist