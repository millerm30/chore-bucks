import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/Auth";

const Navigation = () => {
  const { handleLogOut } = useUser();

  const style = {
    navigationBar: `navbarContent relative w-full flex flex-wrap items-center justify-between py-2 bg-gray-100 text-gray-500 shadow-lg navbar navbar-expand-sm navbar-light`,
    dividerOne: `flex-grow items-center`,
    unorderedList: `navbar-nav flex flex-row justify-between w-full pl-0 list-style-none mr-auto`,
    dividerTwo: `leftNavi ml-2 flex flex-row sm:flex-row`,
    listItem: `nav-item px-2 hover:text-gray-700 uppercase cursor-pointer`,
    dividerThree: `rightNavi ml-2 mr-2 flex flex-row sm:flex-row`,
  };

  return (
    <nav className="navbarContainer">
      <nav className={style.navigationBar}>
        <div className={style.dividerOne}>
          <ul className={style.unorderedList}>
            <div className={style.dividerTwo}>
              <li className={style.listItem}>
                <Link to="/">Home</Link>
              </li>
              <li className={style.listItem}>
                <Link to="/chores">Chores</Link>
              </li>
            </div>
            <div className={style.dividerThree}>
              <li className={style.listItem}>
                <Link to="/wishlist">Wishlist</Link>
              </li>
              <li className={style.listItem}>
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