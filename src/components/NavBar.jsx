import React from "react";
import { NavLink } from "react-router-dom";
import home from "../assets/piggybank.svg";
import calendar from "../assets/calendar.svg";
import table from "../assets/table.svg";
import setting from "../assets/setting.svg";

const NavBar = () => {
  const imgClass = "w-7 inline-block mr-2";
  const liClass =
    "px-4 py-2 flex justify-center w-fit h-fit hover:bg-stone-400";
  return (
    <nav className="bg-white shadow-md text-[2vw] px-6 py-2 flex ">
      <ul className="flex space-x-8 ">
        <li className={liClass}>
          <NavLink to="/" end>
            <img src={home} alt="home" className={imgClass} />
            Home
          </NavLink>
        </li>
        <li className={liClass}>
          <NavLink to="/table" end>
            <img src={table} alt="table" className={imgClass} />
            Table
          </NavLink>
        </li>
        <li className={liClass}>
          <NavLink to="/calendar" end>
            <img src={calendar} alt="calendar" className={imgClass} />
            Calendar
          </NavLink>
        </li>
        <li className={liClass}>
          <NavLink to="/setting" end>
            <img src={setting} alt="setting" className={imgClass} />
            setting
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
