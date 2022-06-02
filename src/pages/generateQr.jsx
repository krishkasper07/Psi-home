import React from "react";
import { useContext, useState, useRef } from "react";
import { orderContext, ThemeContext } from "../App";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { useReactToPrint } from "react-to-print";
import QrPrinter from "../components/qrPrinter";
import qr1 from '../assets/qr-code1.png';
import qr2 from '../assets/qr-code2.png';
function GenerateQr() {
  const { homeOrders } = useContext(orderContext);
  const { dark } = useContext(ThemeContext);
  const searchRef = useRef('');
  const [search, setSearch] = useState(false);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const filter = homeOrders.filter(
    (el) => el.order_number === parseInt(searchRef.current.value)
  );

  return (
    <div className="absolute top-20 w-full h-[90vh]">
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
      {search && filter.length > 0 ? (
        
          <QrPrinter ref={componentRef} dark={dark} order={filter} />
        
      ) : (
        <div className=" mt-4 flex justify-center items-center flex-col w-full">
          <div className={`mt-4 flex justify-center items-center flex-col h-[75vh] w-80 md:w-[40rem] ${dark ? 'shadow-emerald-600':'shadow-blue-800'} rounded-md shadow-md`}>
             <img  src={`${dark ? qr2 :qr1}`} className="w-60 h-60" alt="qrgif"/>
             <span className={`${dark ? 'text-emerald-100':'text-blue-800'} font-extrabold m-2 text-center`}>Type Order Number Above And Get Your Qr-Codes</span>
          </div>
        </div>
      )}
      {search && filter.length > 0 ? (
        <div className="flex justify-center items-center">
          <button
            onClick={handlePrint}
            className={`p-1 m-2 rounded-md shadow-md ${
              dark
                ? "shadow-emerald-600 hover:bg-emerald-800  text-white"
                : "hover:bg-blue-900 hover:text-white shadow-blue-800"
            }`}
          >
            print this out!..
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default GenerateQr;
