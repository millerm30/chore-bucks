import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useUser } from "../contexts/Auth"
import AppImage from "../assets/chorebucks.png";
import { FcCurrencyExchange } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
  const { login } = useUser();
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

  const style = {
    mainContainer: `bg-blue-100 h-screen`,
    appLogoDivider: `flex justify-center py-6`,
    currecnyLogo: `text-4xl`,
    appLogo: `w-1/2 md:w-1/4 lg:w-1/4`,
    formDivider: `flex flex-col items-center justify-start`,
    form: `w-3/4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-1/2 lg:w-1/3 my-8`,
    useremailLabel: `block text-gray-700 text-sm font-bold mb-2`,
    useremailInput: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`,
    userInfoDivider: `mb-4`,
    passInfoDividerOne: `mb-6`,
    passInfoDividerTwo: `flex justify-between`,
    passwordLabel: `block text-gray-700 text-sm font-bold mb-2`,
    spanBox: `flex items-start`,
    passwordInput: `shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`,
    showPassEeyeButton: `text-gray-700 text-2xl cursor-pointer mr-1`,
    signInButton: `bg-blue-900 my-4 px-4 py-2 text-white font-bold rounded-lg`,
    paragraphOne: `text-xs mt-2 text-center`,
    paragraphTwo: `text-center text-black-500 text-xs pt-6`,
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.appLogoDivider}>
        <FcCurrencyExchange className={style.currecnyLogo} />
        <img src={AppImage} alt="" className={style.appLogo} />
      </div>
      <div className={style.formDivider}>
        <form
          className={style.form}
          onSubmit={handleSubmit}
        >
          <div className={style.userInfoDivider}>
            <label
              htmlFor="email"
              className={style.useremailLabel}
            >
              Email
            </label>
            <input
              onChange={handleUsernameChange}
              value={email}
              name="email"
              className={style.useremailInput}
              id="email"
              type="text"
              placeholder="Email..."
            />
          </div>
          <div className={style.passInfoDividerOne}>
            <div className={style.passInfoDividerTwo}>
              <span>
                <label
                  htmlFor="password"
                  className={style.passwordLabel}
                >
                  Password
                </label>
              </span>
              <span className={style.spanBox}>
                <button
                  onClick={handleChangeEye}
                  className={style.showPassEeyeButton}
                >
                  {!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
                {!showPassword ? "show" : "hide"}
              </span>
            </div>
            <input
              onChange={handlePasswordChange}
              value={password}
              name="password"
              className={style.passwordInput}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="******************"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col">
            <button
              disabled={!email || !password}
              className={`${style.signInButton} ${
                !email || !password
                  ? "opacity-40 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Sign In
            </button>
          </div>
          <p className={style.paragraphTwo}>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-900">
              Register
            </Link>
          </p>
        </form>
        <p className={style.paragraphTwo}>
          &copy;2022 Design By Michael Miller.
        </p>
      </div>
    </div>
  );
}

export default Login