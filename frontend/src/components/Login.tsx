import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useUser } from "../contexts/Auth"
import AppImage from "../assets/chorebucks.png";
import { FcCurrencyExchange } from "react-icons/fc";
import { Link } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { MdVpnKey } from "react-icons/md";

const Login = () => {
  const { login, loginStatus } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
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
    login(email, password);
  };

  return (
    <div className="bg-blue-100 h-screen">
      <div className="flex justify-center py-6">
        <FcCurrencyExchange className="text-4xl" />
        <img src={AppImage} alt="" className="w-1/2 md:w-1/4 lg:w-1/4" />
      </div>
      <div className="flex flex-col items-center justify-start">
        <form
          className="w-3/4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-1/2 lg:w-1/3 my-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <div className="flex flex-row bg-blue-900 border-2 border-blue-900 rounded">
              <div className="flex self-center mx-1">
                <AiOutlineMail className="text-2xl text-white" />
              </div>
              <input
                onChange={handleUsernameChange}
                value={email}
                name="email"
                className="w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none rounded"
                id="email"
                type="text"
                placeholder="User Email..."
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between">
              <span>
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
              </span>
            </div>
            <div className="flex flex-row bg-blue-900 border-2 border-blue-900 rounded">
              <div className="flex self-center mx-1">
                <MdVpnKey className="text-2xl text-white" />
              </div>
              <input
                onChange={handlePasswordChange}
                value={password}
                name="password"
                className="w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none rounded"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="******************"
                autoComplete="off"
              />
              <div className="flex self-center mx-1">
                <button
                  onClick={handleChangeEye}
                  className="text-2xl text-white cursor-pointer"
                >
                  {!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <button
              disabled={!email || !password}
              className={`${"bg-blue-900 my-4 px-4 py-2 text-white font-bold rounded-lg"} ${
                !email || !password
                  ? "opacity-40 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {loginStatus}
            </button>
          </div>
          <p className="text-center text-black-500 text-xs pt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-900">
              Register
            </Link>
          </p>
        </form>
        <p className="text-center text-black-500 text-xs pt-6">
          &copy;2022 Design By Michael Miller.
        </p>
      </div>
    </div>
  );
}

export default Login