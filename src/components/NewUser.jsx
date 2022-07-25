import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const getInitialUsersFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user);
    }
    return [user];
}

const Newuser = () => {
    const [ newUser, setNewUser ] = useState(getInitialUsersFromLocalStorage());
    const [ newUsername, setNewUsername ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");
    const [ showPassword, setShowPassword ] = useState(false);

    const handleNewUsernameChange = (e) => {
        setNewUsername(e.target.value);
    }

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    }

    const handleChangeEye = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setNewUser([...newUser, { username: newUsername, password: newPassword }]);
        setNewUsername("");
        setNewPassword("");
        window.location.pathname = ("/chore-Bucks");
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(newUser));
    }
    , [newUser]);

    return (
      <div className="bg-blue-100 flex flex-col h-screen justify-center">
        <h1 className="text-center">Registration Form</h1>
        <form
          className=" w-3/4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-1/2 lg:w-1/3 mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              onChange={handleNewUsernameChange}
              value={newUsername}
              name="userName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
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
              <span className="flex items-start">
                <button
                  onClick={handleChangeEye}
                  className="text-gray-700 text-2xl cursor-pointer mr-1"
                >
                  {!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
                {!showPassword ? "show" : "hide"}
              </span>
            </div>
            <input
              onChange={handleNewPasswordChange}
              value={newPassword}
              name="password"
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="******************"
            />
          </div>
          <div className="flex flex-col">
            <button
              disabled={!newUsername || !newPassword}
              className={`bg-blue-900 my-4 px-4 py-2 text-white font-bold rounded-lg ${
                !newUsername || !newPassword
                  ? "opacity-40 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
}

export default Newuser