import React, {useState} from 'react'

const Wishadd = ({addWish}) => {
  const [title, setTitle] = useState('')
  const handleSubmit = (e) => {
      e.preventDefault()
      addWish(title)
      setTitle('')
  }
  return (
    <div className="container mx-auto pt-10">
      <form onSubmit={handleSubmit} className="flex flex-col w-3/4 mx-auto md:w-1/3 items-center">
        <h1 className="text-2xl font-semibold p-1 text-center">😉 Wish List! 👍</h1>
        <label className="mb-3">Add Wish Item:</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          required
          placeholder='Enter your wish item...'
          className="rounded-md py-2 px-2 border border-blue-700 rounded outline-none w-full"
        ></input>
        <button
          type="submit"
          value="add wish"
          className="bg-blue-400 mt-5 self-center px-4 py-2 border-2 border-blue-600 rounded-lg hover:bg-blue-500"
        >
          Add Wish Item
        </button>
      </form>
    </div>
  );
}

export default Wishadd