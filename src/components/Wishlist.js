import React, {useState} from 'react'
import {v4 as uuid} from 'uuid'
import Wishadd from './Wishadd';

const Wishlist = () => {
  const [wishes, setWishes] = useState([
    {title: '', id: ''}
  ]);
  const addWish = (title) => {
    setWishes([...wishes, {title, id: uuid()}])
  }
  return (
    <div className="wishList">
      <Wishadd addWish={addWish} />
      <ul>
        {wishes.map((wish) => {
          return <li key={wish.id}>{wish.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default Wishlist