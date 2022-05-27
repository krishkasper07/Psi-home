import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { BiMenu, BiUserCircle, BiPowerOff } from "react-icons/bi";
import  {RiCloseFill}  from "react-icons/ri";
import { useContext } from "react";
import { useState } from "react";
import AuthContext from "../authContext/authProvider";

export default function NavBar() {
  const [isSideMenuOpen, setisSideMenuOpen] = useState(false);
  const [showUserName, setShowUserName] = useState(false);
  const { user, logOutUser } = useContext(AuthContext);
  const showSideMenu = () => {
    isSideMenuOpen ? setisSideMenuOpen(false) : setisSideMenuOpen(true);
  };

  return (
    <div className="fixed w-full border-b-4  border-slate-900 bg-black text-gray-200 flex flex-row justify-between items-center z-40">
      <motion.span
        class="bg-emerald-600 cursor-pointer flex items-center justify-center font-bold  text-2xl clip w-14 h-14 border-2 border-green-600 mx-2 my-2"
        whileHover={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
      >
        PSI
      </motion.span>
      <ul className="hidden lg:flex lg:flex-row text-lg">
        <li className="p-5">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "border-b-2 p-5 border-emerald-600" : ""
            }
          >
            Home
          </NavLink>
        </li>
        <li className="p-5">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "border-b-2 p-5 border-emerald-600" : ""
            }
          >
            DashBoard
          </NavLink>
        </li>
        <li className="p-5">
          <NavLink
            to="/Qr"
            className={({ isActive }) =>
              isActive ? "border-b-2 p-5 border-emerald-600" : ""
            }
          >
            Generate-Qr
          </NavLink>
        </li>
        <li className="p-5">
          <NavLink
            to="/scan"
            className={({ isActive }) =>
              isActive ? "border-b-2 p-5 border-emerald-600" : ""
            }
          >
            Scan-Qr
          </NavLink>
        </li>
        <li className="p-5">
          <NavLink
            to="/activity"
            className={({ isActive }) =>
              isActive ? "border-b-2 p-5 border-emerald-600" : ""
            }
          >
            Activity
          </NavLink>
        </li>
        <li className="p-5">
        <NavLink
              to="/customer-support"
              className={({ isActive }) =>
                isActive ? "border-b-2 p-5 border-emerald-600" : ""
              }
            >
              Customer-Support
            </NavLink>
        </li>
       
        {user ? (
          <>
            <li className="p-5">
              <motion.button
                whileHover={{ scale: 1.9 }}
                whileTap={{ scale: 0.9 }}
                className="flex justify-center items-center"
              >
                <BiUserCircle
                  className="w-8 h-7 text-green-600 cursor-pointer"
                  onClick={() => setShowUserName(!showUserName)}
                />
              </motion.button>
            </li>
          </>
        ) : (
          <>
            <li className="p-5">
              <NavLink
                to="/signIn"
                className="shadow-xl p-1 rounded bg-violet-900"
              >
                SignIn
              </NavLink>
            </li>
            <li className="p-5">
              <NavLink
                to="/signUp"
                className="shadow-xl p-1 rounded bg-violet-900"
              >
                SignUP
              </NavLink>
            </li>
          </>
        )}
      </ul>
      {isSideMenuOpen ? (
        < RiCloseFill
          className="lg:hidden md:block w-10 h-14 cursor-pointer text-white"
          onClick={showSideMenu}
        />
      ) : (
        <BiMenu
          className="lg:hidden md:block w-10 h-14 cursor-pointer"
          onClick={showSideMenu}
        />
      )}
      {isSideMenuOpen ? sideBar() : ""}
      {showUserName ? showUser(user, logOutUser) : ""}
    </div>
  );
}

const sideBar = () => {
  return (
    <>
      <div className="lg:hidden sm:w-1/4 bg-slate-900 top-[4rem] fixed h-1/2 rounded border-2 border-slate-800 right-2">
        <ul className="flex flex-col items-center text-xl font-bold">
          <li className="p-5">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 p-5 border-emerald-600 hover:bg-slate-900"
                  : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li className="p-5">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "border-b-2 p-5 border-emerald-600" : ""
              }
            >
              DashBoard
            </NavLink>
          </li>
          <li className="p-5">
            <NavLink
              to="/Qr"
              className={({ isActive }) =>
                isActive ? "border-b-2 p-5 border-emerald-600" : ""
              }
            >
              Generate-Qr
            </NavLink>
          </li>
          <li className="p-5">
            <NavLink
              to="/scan"
              className={({ isActive }) =>
                isActive ? "border-b-2 p-5 border-emerald-600" : ""
              }
            >
              Scan-Qr
            </NavLink>
          </li>
          <li className="p-5">
            <NavLink
              to="/activity"
              className={({ isActive }) =>
                isActive ? "border-b-2 p-5 border-emerald-600" : ""
              }
            >
              Activity
            </NavLink>
          </li>
          <li className="p-5">
          <NavLink
              to="/customer-support"
              className={({ isActive }) =>
                isActive ? "border-b-2 p-5 border-emerald-600" : ""
              }
            >
              Customer-Support
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

const showUser = (user, logOutUser) => {
  return (
    <div className="bg-slate-900 min-w-[10rem]  top-[4rem]  fixed h-14 flex items-center justify-center shadow-slate-800 rounded-md shadow-md border-2 border-slate-800 right-4">
      <div className="flex items-center justify-center">
        <span className="text-green-500 text-xl font-extrabold">
          {user.userName}😎
        </span>
        <BiPowerOff
          className="w-10 h-10 text-red-700 cursor-pointer ml-2"
          onClick={logOutUser}
        />
      </div>
    </div>
  );
};
