import React, {useState} from "react";

const Wishadd = ({addWish}) => {
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState("");

  const handleSubmit = (e) => {
      e.preventDefault()
      addWish(title, Number(points))
      setTitle("")
      setPoints("")
  };
  
  return (
    <section className="container mx-auto pt-10">
      <section className="wishHeader">
        <h1 className="text-2xl font-semibold p-1 text-center">😉 Wish List! 👍</h1>
        <p className="text-center">Add items to your wish list that you would like to build your points to purchase!</p>
      </section>
      <form onSubmit={handleSubmit} className="flex flex-col w-3/4 mx-auto md:w-1/3">
        <label className="text-left mt-5">Add Wish Item:</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          required
          placeholder="Enter your wish item..."
          className="rounded-md py-2 px-2 border border-blue-700 rounded outline-none w-full mb-2"
        >
        </input>
        <label className="text-left">Add Point Value:</label>
        <input 
          onChange={(e) => setPoints(e.target.value)}
          value={points}
          type="number"
          required
          placeholder="Enter point value..."
          className="rounded-md py-2 px-2 border border-blue-700 rounded outline-none w-1/2"
        >
        </input>
        <button
          type="submit"
          value="add wish"
          className="bg-blue-400 mt-5 self-center px-4 py-2 border-2 border-blue-600 rounded-lg hover:bg-blue-500"
        >
          Add Wish Item
        </button>
      </form>
    </section>
  );
}

export default Wishadd