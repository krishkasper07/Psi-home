import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { BiMenu, BiUserCircle, BiPowerOff } from "react-icons/bi";
import  {RiCloseFill}  from "react-icons/ri";
import { useContext } from "react";
import { useState } from "react";
import AuthContext from "../authContext/authProvider";
import { ThemeContext } from "../App";
import Theme from "../components/theme";

export default function NavBar() {
  const [isSideMenuOpen, setisSideMenuOpen] = useState(false);
  const [showUserName, setShowUserName] = useState(false);
  const { user, logOutUser } = useContext(AuthContext);
  const {dark}=useContext(ThemeContext)
  const showSideMenu = () => {
    isSideMenuOpen ? setisSideMenuOpen(false) : setisSideMenuOpen(true);
  };

  const [isHomeActive,setHome]=useState(false)
  const [isDashBoardActive,setDash]=useState(false)
  const [isGenerateActive,setGen]=useState(false)
  const [isScanActive,setScan]=useState(false)
  const [isActivityActive,setAct]=useState(false)
  const [isCustomerActive,setCus]=useState(false)

  return (
    <div className={`fixed w-full shadow-md ${dark? 'text-gray-200 shadow-slate-800 bg-black':'bg-white'} flex flex-row justify-between items-center z-40`}>
      <motion.span
        className={`${dark ? 'bg-emerald-600 border-green-600':'border-blue-800 bg-blue-800 text-white'} cursor-pointer flex items-center justify-center font-bold  text-2xl clip w-14 h-14 border-2  mx-2 my-2`}
        whileHover={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
      >
        PSI
      </motion.span>
      <ul className="hidden lg:flex lg:flex-row text-lg">
        <li className={`p-5 ${isHomeActive ?`border-b-4 ${dark ? 'border-emerald-600':'border-blue-800'}`:''}`}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
             setHome(isActive)
            }
          >
            Home
          </NavLink>
        </li>
        <li className={`p-5 ${isDashBoardActive ?`border-b-4 ${dark ? 'border-emerald-600':'border-blue-800'}`:''}`}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              setDash(isActive)
            }
          >
            DashBoard
          </NavLink>
        </li>
        <li className={`p-5 ${isGenerateActive ?`border-b-4 ${dark ? 'border-emerald-600':'border-blue-800'}`:''}`}>
          <NavLink
            to="/Qr"
            className={({ isActive }) =>
              setGen(isActive)
            }
          >
            Generate-Qr
          </NavLink>
        </li>
        <li className={`p-5 ${isScanActive ?`border-b-4 ${dark ? 'border-emerald-600':'border-blue-800'}`:''}`}>
          <NavLink
            to="/scan"
            className={({ isActive }) =>
              setScan(isActive)
            }
          >
            Scan-Qr
          </NavLink>
        </li>
        <li className={`p-5 ${isActivityActive ?`border-b-4 ${dark ? 'border-emerald-600':'border-blue-800'}`:''}`}>
          <NavLink
            to="/activity"
            className={({ isActive }) =>
              setAct(isActive)
            }
          >
            Activity
          </NavLink>
        </li>
        <li className={`p-5 ${isCustomerActive ?`border-b-4 ${dark ? 'border-emerald-600':'border-blue-800'}`:''}`}>
        <NavLink
              to="/customer-support"
              className={({ isActive }) =>
               setCus(isActive)
              }
            >
              Customer-Support
            </NavLink>
        </li>
        <li className="p-5">
       <Theme/>
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
                  className={`w-8 h-8 ${dark? 'text-green-600':'text-blue-800'} cursor-pointer`}
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
                className={`shadow-xl p-1 rounded ${dark ?'bg-violet-700':'bg-blue-800 text-white'}`}
              >
                SignIn
              </NavLink>
            </li>
            <li className="p-5">
              <NavLink
                to="/signUp"
                className={`shadow-xl p-1 rounded ${dark ?'bg-violet-700':'bg-blue-800 text-white'} `}
              >
                SignUP
              </NavLink>
            </li>
          </>
        )}
      </ul>
      {isSideMenuOpen ? (
        < RiCloseFill
          className={`lg:hidden md:block w-10 h-14 cursor-pointer ${dark?'text-white':''}`}
          onClick={showSideMenu}
        />
      ) : (
        <BiMenu
          className="lg:hidden md:block w-10 h-14 cursor-pointer"
          onClick={showSideMenu}
        />
      )}
      {isSideMenuOpen ? sideBar(dark,user,setShowUserName,showUserName) : ""}
      {showUserName ? showUser(user, logOutUser,dark) : ""}
    </div>
  );
}

const sideBar = (dark,user,setShowUserName,showUserName) => {
  return (
    <>
      <div className={`lg:hidden sm:w-1/4 ${dark ? 'bg-slate-900 border-2 border-slate-800 text-white':'bg-white shadow-xl border text-black'}  top-[4rem] fixed  rounded  right-2`}>
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
          <li className="p-5">
       <Theme/>
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
                  className={`w-8 h-8 ${dark? 'text-green-600':'text-blue-800'} cursor-pointer`}
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
                className={`shadow-xl p-1 rounded ${dark ?'bg-violet-700':'bg-blue-800 text-white'}`}
              >
                SignIn
              </NavLink>
            </li>
            <li className="p-5">
              <NavLink
                to="/signUp"
                className={`shadow-xl p-1 rounded ${dark ?'bg-violet-700':'bg-blue-800 text-white'} `}
              >
                SignUP
              </NavLink>
            </li>
          </>
        )}
        </ul>
      </div>
    </>
  );
};

const showUser = (user, logOutUser,dark) => {
  return (
    <div className={` ${dark ? 'bg-slate-900 border-2 border-slate-800 shadow-slate-800':' bg-white border'} min-w-[10rem] right-10 top-2 md:top-[4rem]  fixed h-14 flex items-center justify-center  rounded-md shadow-md   md:right-4`}>
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
