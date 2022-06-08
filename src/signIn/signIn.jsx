import React from "react";
import { useContext } from "react";
import AuthContext from "../authContext/authProvider";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../App";
import Theme from "../components/theme";
import { ImHome3 } from "react-icons/im";
import { motion } from "framer-motion";
export default function SignIn() {
  const { signIn } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);
  return (
    <div
      className={`w-full h-[100vh] flex justify-center items-center ${
        dark ? "bg-black text-white" : "bg-blue-800 text-blue-600"
      } `}
    >
      <div className="absolute top-4 right-2">
        <Theme />
      </div>
      <motion.div
        className="absolute top-4  left-2 cursor-pointer"
        animate={{ x: [0, 100, 0] }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
       <NavLink to={'/'}>
        <ImHome3
          className={`w-10 h-10 ${dark ? "text-slate-600" : "text-blue-200"}`}
        />
        </NavLink>
      </motion.div>
      <form
        onSubmit={signIn}
        className={`flex flex-col  p-2 h-56 w-72 shadow-md rounded-md ${
          dark ? "bg-slate-900 shadow-slate-800" : "bg-slate-50 shadow-blue-700"
        } justify-center items-center`}
      >
        <div className={`flex justify-center items-center flex-col my-2`}>
          <label className={`flex justify-start`}>Username</label>
          <input
            className={`${
              dark ? "bg-slate-800" : "bg-blue-200"
            } border-none outline-none p-1 rounded-md`}
            type="text"
            name="userName"
          />
        </div>
        <div className={`flex justify-center items-center flex-col my-2`}>
          <label className={`flex justify-start`}>Password</label>
          <input
            className={`border-none outline-none p-1 rounded-md ${
              dark ? "bg-slate-800" : "bg-blue-200"
            }`}
            type="password"
            name="password"
          />
        </div>
        <button
          type="submit"
          className={`shadow-md p-1 mt-2 rounded-md ${
            dark
              ? "bg-emerald-800 shadow-emerald-600"
              : "bg-blue-800 shadow-blue-600"
          }  text-white`}
        >
          Sign In
        </button>
        <div className={`mt-2 text-xs md:text-md`}>
          <span className="mr-1">Not Yet Registered Click here to</span>
          <NavLink
            className={`font-bold ${
              dark ? "text-emerald-800" : "text-blue-800"
            }`}
            to={"/signUp"}
          >
            Sign Up
          </NavLink>
        </div>
      </form>
    </div>
  );
}
