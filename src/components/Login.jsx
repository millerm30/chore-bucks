import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AppLogo from "../assets/appLogo.png";
import { useUser } from "../contexts/Auth"

const Login = () => {
  const { login } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeEye = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password)
  };

  return (
    <div className="bg-blue-100">
      <div className="flex justify-center">
        <img src={AppLogo} alt="" className="w-16 md:block" />
        <h1 className="self-center">
          <span className="text-3xl text-blue-800 font-bold">Chore</span>
          <span className="text-3xl text-green-800 font-bold">Bucks</span>
        </h1>
      </div>
      <div className="flex flex-col items-center justify-around h-screen">
        <form className=" w-3/4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-1/2 lg:w-1/3" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              onChange={handleUsernameChange}
              value={username}
              name="userName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <button
                onClick={handleChangeEye}
                className="text-gray-700 text-2xl cursor-pointer"
              >
                {!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            <input
              onChange={handlePasswordChange}
              value={password}
              name="password"
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="******************"
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="flex flex-col">
            <button
              disabled={!username || !password}
              className={`bg-blue-900 my-4 self-start px-4 py-2 text-white font-bold rounded-lg ${
                !username || !password ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Sign In
            </button>
            <p className='text-xs mt-2 text-center'>To login please use Guest as your username and password!</p>
          </div>
        </form>
        <p className="text-center text-black-500 text-xs">
          &copy;2022 Design By Michael Miller.
        </p>
      </div>
    </div>
  );
}

export default Login