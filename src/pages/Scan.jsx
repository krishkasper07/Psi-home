import React,{useContext, useRef, useState} from 'react';
import {orderContext,ThemeContext} from '../App';
import { AiOutlineClose } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
function Scan() {
  const {homeOrders,scannedOrders}=useContext(orderContext);
  const {dark}=useContext(ThemeContext);
  const searchRef=useRef('');
  const [search,setSearch]=useState(false);
  const filter=homeOrders.filter(el=>el.order_number === parseInt(searchRef.current.value));
  const activity=scannedOrders.filter(el=>el.order_number === parseInt(searchRef.current.value));

  return (
    <div  className="absolute top-20 w-full">
        <div className="flex justify-center items-center  mt-4">
        <input
          type="text"
          ref={searchRef}
          placeholder="Search By Order Number"
          className={`shadow-md  w-72 text-xs md:text-lg md:w-96 h-8 p-1 text-center placeholder:text-center font-bold  ${
            dark
              ? "bg-slate-900 text-slate-400 shadow-emerald-800 hover:bg-slate-800"
              : "placeholder:text-blue-700 shadow-blue-700 text-blue-800"
          } rounded-md border-none outline-none`}
        />
        {search ? (
          <AiOutlineClose
            className={`w-10 h-8  shadow-md rounded-r-md cursor-pointer ${
              dark
                ? "text-slate-400 hover:bg-slate-800 shadow-emerald-800 bg-slate-900"
                : "text-blue-700 shadow-blue-700"
            }`}
            onClick={() => {
              searchRef.current.value = "";
              setSearch(false);
            }}
          />
        ) : (
          <BiSearchAlt
            className={`w-10 h-8  shadow-md rounded-r-md cursor-pointer ${
              dark
                ? "text-slate-400 hover:bg-slate-800 shadow-emerald-800 bg-slate-900"
                : "text-blue-700 shadow-blue-700"
            }`}
            onClick={() => setSearch(true)}
          />
        )}
      </div>
          {activity === undefined ? <>
          undefiend
          </> : <>
          pass homeOrders to scanner
          </>}
    </div>
  )
}

export default Scan