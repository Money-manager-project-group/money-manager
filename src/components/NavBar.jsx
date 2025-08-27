import { NavLink, useLocation } from "react-router-dom";
import home from "../assets/piggybank.svg";
import calendar from "../assets/calendar.svg";
import table from "../assets/table.svg";
import setting from "../assets/setting.svg";

const NavBar = () => {
  const location = useLocation().pathname;
  let highlightPage = "";
  switch (location) {
    case "/":
      highlightPage = "home";
      break;
    case "/calendar":
      highlightPage = "calendar";
      break;
    case "/table":
      highlightPage = "table";
      break;
    case "/setting":
      highlightPage = "setting";
      break;
    default:
      break;
  }

  const imgClass = "w-7 inline-block mr-2 group-hover:invert-100";
  const liClass =
    "rounded-sm font-sans px-5 py-2 flex justify-center w-fit h-fit hover:bg-gray-500 hover:text-white group";
  const selectedImgClass = imgClass + " invert-100";
  const selectedLiClass = liClass + " bg-black text-white";
  return (
    <nav className="bg-white shadow-md text-[2vw] px-6 py-2 flex ">
      <ul className="flex space-x-8 text-2xl font-semibold">
        <li className={highlightPage == "home" ? selectedLiClass : liClass}>
          <NavLink to="/" end>
            <img
              src={home}
              alt="home"
              className={highlightPage == "home" ? selectedImgClass : imgClass}
            />
            Home
          </NavLink>
        </li>
        <li className={highlightPage == "table" ? selectedLiClass : liClass}>
          <NavLink to="/table" end>
            <img
              src={table}
              alt="table"
              className={highlightPage == "table" ? selectedImgClass : imgClass}
            />
            Table
          </NavLink>
        </li>
        <li className={highlightPage == "calendar" ? selectedLiClass : liClass}>
          <NavLink to="/calendar" end>
            <img
              src={calendar}
              alt="calendar"
              className={
                highlightPage == "calendar" ? selectedImgClass : imgClass
              }
            />
            Calendar
          </NavLink>
        </li>
        <li className={highlightPage == "setting" ? selectedLiClass : liClass}>
          <NavLink to="/setting" end>
            <img
              src={setting}
              alt="setting"
              className={
                highlightPage == "setting" ? selectedImgClass : imgClass
              }
            />
            setting
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
