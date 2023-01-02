import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/Auth";

const Navigation = () => {
  const { handleLogOut } = useUser();

  return (
    <nav className="navbarContainer">
      <nav className="navbarContent relative w-full flex flex-wrap items-center justify-between py-2 bg-gray-100 text-gray-500 shadow-lg navbar navbar-expand-sm navbar-light">
        <div className="flex-grow items-center">
          <ul className="navbar-nav flex flex-row justify-between w-full pl-0 list-style-none mr-auto">
            <div className="leftNavi ml-2 flex flex-row sm:flex-row">
              <li className="nav-item px-2 hover:text-gray-700 uppercase cursor-pointer">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item px-2 hover:text-gray-700 uppercase cursor-pointer">
                <Link to="/chores">Chores</Link>
              </li>
            </div>
            <div className="rightNavi ml-2 mr-2 flex flex-row sm:flex-row">
              <li className="nav-item px-2 hover:text-gray-700 uppercase cursor-pointer">
                <Link to="/wishlist">Wishlist</Link>
              </li>
              <li className="nav-item px-2 hover:text-gray-700 uppercase cursor-pointer">
                <p onClick={handleLogOut}>Logout</p>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </nav>
  );
}

export default Navigation