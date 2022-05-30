import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../App";
import {MdDarkMode,MdLightMode} from 'react-icons/md';

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
export default function Theme() {
  const { dark, changeTheme } = useContext(ThemeContext);
  return (
  <div
      className={`border-black   w-14 h-8 p-1 flex ${
        dark ? "justify-start bg-slate-700" : "justify-end bg-blue-900"
      } items-center rounded-xl cursor-pointer`}
      onClick={changeTheme}
    >
      <motion.div
        className=" rounded-full"
        layout
        transition={spring}
      >
          {dark ? <MdDarkMode className="text-2xl text-white"/>:<MdLightMode className="text-2xl text-yellow-400"/>}

          </motion.div>
    </div>
 
  );
}
