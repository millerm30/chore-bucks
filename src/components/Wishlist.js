import React, {useState} from 'react'


const Wishlist = () => {
  const [wishItem, setWishItem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({wishItem})
    setWishItem(e.target[0].value);
  }

  return (
    <div className="container mx-auto pt-10">
      <h1 className="text-2xl font-semibold p-1 text-center">😉 Future Wish List Page 👍</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-3/4 mx-auto md:w-1/3 items-center">
        <label htmlFor="wishlist" className="mb-3">Wish List Item</label>
        <input
        type='text'
        className="rounded-md py-2 px-2 border border-blue-700 rounded outline-none w-full"
        placeholder='Enter Wish Item...'
        >
        </input>
        <button
        type='submit'
        className='bg-blue-400 mt-5 self-center px-4 py-2 border-2 border-blue-600 rounded-lg hover:bg-blue-500'>
          Add WishItem
        </button>
      </form>
      <p className='text-center'>{wishItem}</p>
    </div>
  );
}

export default Wishlist