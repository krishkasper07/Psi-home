import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { BiMenu, BiUserCircle, BiPowerOff } from "react-icons/bi";
import { RiCloseFill } from "react-icons/ri";
import { useContext } from "react";
import { useState } from "react";
import AuthContext from "../authContext/authProvider";
import { ThemeContext } from "../App";
import Theme from "../components/theme";

export default function NavBar() {
  const [isSideMenuOpen, setisSideMenuOpen] = useState(false);
  const [showUserName, setShowUserName] = useState(false);
  const { user, logOutUser } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);
  const showSideMenu = () => {
    isSideMenuOpen ? setisSideMenuOpen(false) : setisSideMenuOpen(true);
  };

  return (
    <div
      className={`fixed w-full shadow-md ${
        dark ? "text-gray-200 shadow-slate-800 bg-black" : "bg-white"
      } flex flex-row justify-between items-center z-40`}
    >
      <motion.span
        className={`${
          dark
            ? "bg-emerald-600 border-green-600"
            : "border-blue-800 bg-blue-800 text-white"
        } cursor-pointer flex items-center justify-center font-bold  text-2xl clip w-14 h-14 border-2  mx-2 my-2`}
        whileHover={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
      >
        PSI
      </motion.span>
      <ul className="hidden lg:flex lg:flex-row text-lg">
        <li className={`p-5`}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? `${
                    dark
                      ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                      : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                  }`
                : ""
            }
          >
            Home
          </NavLink>
        </li>
        {user ? (
          <>
            {user.department === "admin" ||
            user.department === "Customer-Support" ||
            user.department === "Design" ? (
              <>
                <li className={`p-5`}>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? `${
                            dark
                              ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                              : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                          }`
                        : ""
                    }
                  >
                    DashBoard
                  </NavLink>
                </li>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <li className={`p-5`}>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? `${
                        dark
                          ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                          : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                      }`
                    : ""
                }
              >
                DashBoard
              </NavLink>
            </li>
          </>
        )}

{user ? (
            <>
              {user.department === "Design" ||
              user.department === "admin" ||
              user.department === "Packing" ? (
                <>
                  <li className="p-5">
                    <NavLink
                      to="/Qr"
                      className={({ isActive }) =>
                        isActive
                          ? `${
                              dark
                                ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                                : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                            }`
                          : ""
                      }
                    >
                     Generate-Qr
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <li className="p-5">
                <NavLink
                  to="/Qr"
                  className={({ isActive }) =>
                    isActive
                      ? `${
                          dark
                            ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                            : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                        }`
                      : ""
                  }
                >
                 Generate-Qr
                </NavLink>
              </li>
            </>
          )}
        {user ? (
            <>
              {user.department === "Design" ||
              user.department === "admin" ||
              user.department === "Packing" ? (
                <>
                  <li className="p-5">
                    <NavLink
                      to="/scan"
                      className={({ isActive }) =>
                        isActive
                          ? `${
                              dark
                                ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                                : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                            }`
                          : ""
                      }
                    >
                      Scan-Qr
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <li className="p-5">
                <NavLink
                  to="/scan"
                  className={({ isActive }) =>
                    isActive
                      ? `${
                          dark
                            ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                            : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                        }`
                      : ""
                  }
                >
                  Scan-Qr
                </NavLink>
              </li>
            </>
          )}

        {user ? (
            <>
              {user.department === "Design" ||
              user.department === "admin" ||
              user.department === "Packing" ? (
                <>
                  <li className="p-5">
                    <NavLink
                      to="/activity"
                      className={({ isActive }) =>
                        isActive
                          ? `${
                              dark
                                ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                                : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                            }`
                          : ""
                      }
                    >
                      Activity
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <li className="p-5">
                <NavLink
                  to="/activity"
                  className={({ isActive }) =>
                    isActive
                      ? `${
                          dark
                            ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                            : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                        }`
                      : ""
                  }
                >
                  Activity
                </NavLink>
              </li>
            </>
          )}
        {user ? (
          <>
            {user.department === "admin" ||
            user.department === "Customer-Support" ? (
              <>
                <li className={`p-5`}>
                  <NavLink
                    to="/customer-support"
                    className={({ isActive }) =>
                      isActive
                        ? `${
                            dark
                              ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                              : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                          }`
                        : ""
                    }
                  >
                    Customer-Support
                  </NavLink>
                </li>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <li className={`p-5`}>
              <NavLink
                to="/customer-support"
                className={({ isActive }) =>
                  isActive
                    ? `${
                        dark
                          ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                          : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                      }`
                    : ""
                }
              >
                Customer-Support
              </NavLink>
            </li>
          </>
        )}

        <li className="p-5">
          <Theme />
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
                  className={`w-8 h-8 ${
                    dark ? "text-green-600" : "text-blue-800"
                  } cursor-pointer`}
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
                className={`shadow-xl p-1 rounded ${
                  dark ? "bg-violet-700" : "bg-blue-800 text-white"
                }`}
              >
                SignIn
              </NavLink>
            </li>
            <li className="p-5">
              <NavLink
                to="/signUp"
                className={`shadow-xl p-1 rounded ${
                  dark ? "bg-violet-700" : "bg-blue-800 text-white"
                } `}
              >
                SignUP
              </NavLink>
            </li>
          </>
        )}
      </ul>
      {isSideMenuOpen ? (
        <RiCloseFill
          className={`lg:hidden md:block w-10 h-14 cursor-pointer ${
            dark ? "text-white" : ""
          }`}
          onClick={showSideMenu}
        />
      ) : (
        <BiMenu
          className="lg:hidden md:block w-10 h-14 cursor-pointer"
          onClick={showSideMenu}
        />
      )}
      {isSideMenuOpen ? sideBar(dark, user, setShowUserName, showUserName) : ""}
      {showUserName ? showUser(user, logOutUser, dark) : ""}
    </div>
  );
}

const sideBar = (dark, user, setShowUserName, showUserName) => {
  return (
    <>
      <div
        className={`lg:hidden sm:w-56 ${
          dark
            ? "bg-slate-900 border-2 border-slate-800 text-white"
            : "bg-white shadow-xl border text-black"
        }  top-[4rem] fixed  rounded  right-2`}
      >
        <ul className="flex flex-col items-center text-xl font-bold">
          <li className="p-5">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? `${
                      dark
                        ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                        : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                    }`
                  : ""
              }
            >
              Home
            </NavLink>
          </li>
          {user ? (
            <>
              {user.department === "admin" ||
              user.department === "Customer-Support" ||
              user.department === "Design" ? (
                <>
                  <li className={`p-5`}>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        isActive
                          ? `${
                              dark
                                ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                                : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                            }`
                          : ""
                      }
                    >
                      DashBoard
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <li className={`p-5`}>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? `${
                          dark
                            ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                            : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                        }`
                      : ""
                  }
                >
                  DashBoard
                </NavLink>
              </li>
            </>
          )}
         {user ? (
            <>
              {user.department === "Design" ||
              user.department === "admin" ||
              user.department === "Packing" ? (
                <>
                  <li className="p-5">
                    <NavLink
                      to="/Qr"
                      className={({ isActive }) =>
                        isActive
                          ? `${
                              dark
                                ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                                : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                            }`
                          : ""
                      }
                    >
                     Generate-Qr
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <li className="p-5">
                <NavLink
                  to="/Qr"
                  className={({ isActive }) =>
                    isActive
                      ? `${
                          dark
                            ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                            : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                        }`
                      : ""
                  }
                >
                 Generate-Qr
                </NavLink>
              </li>
            </>
          )}
          {user ? (
            <>
              {user.department === "Design" ||
              user.department === "admin" ||
              user.department === "Packing" ? (
                <>
                  <li className="p-5">
                    <NavLink
                      to="/scan"
                      className={({ isActive }) =>
                        isActive
                          ? `${
                              dark
                                ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                                : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                            }`
                          : ""
                      }
                    >
                      Scan-Qr
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <li className="p-5">
                <NavLink
                  to="/scan"
                  className={({ isActive }) =>
                    isActive
                      ? `${
                          dark
                            ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                            : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                        }`
                      : ""
                  }
                >
                  Scan-Qr
                </NavLink>
              </li>
            </>
          )}
          {user ? (
            <>
              {user.department === "Design" ||
              user.department === "admin" ||
              user.department === "Packing" ? (
                <>
                  <li className="p-5">
                    <NavLink
                      to="/activity"
                      className={({ isActive }) =>
                        isActive
                          ? `${
                              dark
                                ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                                : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                            }`
                          : ""
                      }
                    >
                      Activity
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <li className="p-5">
                <NavLink
                  to="/activity"
                  className={({ isActive }) =>
                    isActive
                      ? `${
                          dark
                            ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                            : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                        }`
                      : ""
                  }
                >
                  Activity
                </NavLink>
              </li>
            </>
          )}

          {user ? (
            <>
              {user.department === "admin" ||
              user.department === "Customer-Support" ? (
                <>
                  <li className={`p-5 text-center w-56`}>
                    <NavLink
                      to="/customer-support"
                      className={({ isActive }) =>
                        isActive
                          ? `${
                              dark
                                ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                                : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                            }`
                          : ""
                      }
                    >
                      Customer-Support
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <li className={`p-5`}>
                <NavLink
                  to="/customer-support"
                  className={({ isActive }) =>
                    isActive
                      ? `${
                          dark
                            ? "bg-emerald-800 text-white p-1 shadow-emerald-600 shadow-md rounded-md"
                            : "bg-blue-800 text-white p-1 shadow-md shadow-blue-200 rounded-md"
                        }`
                      : ""
                  }
                >
                  Customer-Support
                </NavLink>
              </li>
            </>
          )}

          <li className="p-5">
            <Theme />
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
                    className={`w-8 h-8 ${
                      dark ? "text-green-600" : "text-blue-800"
                    } cursor-pointer`}
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
                  className={`shadow-xl p-1 rounded ${
                    dark ? "bg-violet-700" : "bg-blue-800 text-white"
                  }`}
                >
                  SignIn
                </NavLink>
              </li>
              <li className="p-5">
                <NavLink
                  to="/signUp"
                  className={`shadow-xl p-1 rounded ${
                    dark ? "bg-violet-700" : "bg-blue-800 text-white"
                  } `}
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

const showUser = (user, logOutUser, dark) => {
  return (
    <div
      className={` ${
        dark
          ? "bg-slate-900 border-2 border-slate-800 shadow-slate-800"
          : " bg-white border"
      } min-w-[10rem] right-10 top-2 md:top-[4rem]  fixed h-14 flex items-center justify-center  rounded-md shadow-md   md:right-4`}
    >
      <div className={`flex items-center justify-center`}>
        <span className={`${dark ? 'text-green-500':'text-blue-800'} text-xl font-extrabold`}>
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
