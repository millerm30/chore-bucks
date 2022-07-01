import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AppLogo from "../assets/appLogo.png";
import { useUser } from "../contexts/Login"

const Login = () => {
  const { signInGuestUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeEye = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInGuestUser();
    setUser("");
    setPassword("");
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
        <form className=" w-3/4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-1/2 lg:w-1/3">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              value={user}
              onChange={handleUserChange}
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
              value={password}
              onChange={handlePasswordChange}
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="******************"
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={!user || !password}
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
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