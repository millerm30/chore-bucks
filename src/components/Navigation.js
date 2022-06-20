import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Squash as Hamburger} from 'hamburger-react';

const Navigation = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => setNav(!nav);

  return (
    <nav className="navbarContainer">
      <nav className="navbarContent relative w-full flex flex-wrap items-center justify-between py-2 bg-gray-100 text-gray-500 shadow-lg navbar navbar-expand-sm navbar-light">
        <div className="container-fluid w-full flex flex-wrap items-center justify-start hamburger">
          <button
            onClick={handleNav}
            className="navbar-toggler text-gray-500 border-0 hover:shadow-none hover:no-underline pr-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          > 
            <Hamburger size={30} rounded duration={0.3} easing="ease-in" toggled={nav} toggle={setNav} /> 
          </button>
        </div>
        <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">
          <ul className="navbar-nav flex flex-col justify-between w-full pl-0 list-style-none mr-auto">
            <div className="leftNavi flex flex-col sm:flex-row">
              <li className="nav-item px-2 hover:text-gray-700 uppercase">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item px-2 hover:text-gray-700 uppercase">
                <Link to="/chores">Chores</Link>
              </li>
              <li className="nav-item px-2 hover:text-gray-700 uppercase">
                <Link to="/choresadd">Add Chores</Link>
              </li>
            </div>
            <div className="rightNavi flex">
              <li className="nav-item px-2 hover:text-gray-700 uppercase">
                <Link to="/wishlist">Wishlist</Link>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </nav>
  );
}

export default Navigation