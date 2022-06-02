import { useContext, useState} from "react";
import { orderContext, ThemeContext } from "../App";
import { AiOutlineFieldNumber,AiOutlineClose } from "react-icons/ai";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import {BiSearchAlt} from 'react-icons/bi';


const Home = () => {
  const { homeOrders } = useContext(orderContext);
  const { dark } = useContext(ThemeContext);
  const [order_number,setOrderNumber]=useState('');
  const [search,setSearch]=useState(false)
  return (
    <div className="absolute top-20 w-full h-[90vh]">
      <div className="flex justify-center items-center  mt-4">
        <input
          type="text"
          value={order_number}
          onChange={(e)=>setOrderNumber(e.target.value)}
          placeholder="Search By Order Number"
          className={`shadow-md  w-72 text-xs md:text-lg md:w-96 h-8 p-1 text-center placeholder:text-center font-bold  ${
            dark
              ? "bg-slate-900 text-slate-400 shadow-emerald-800 hover:bg-slate-800"
              : "placeholder:text-sky-700 shadow-sky-700"
          } rounded-md border-none outline-none`}
        />
         {search ? (
          <AiOutlineClose
            className={`w-10 h-8  shadow-md rounded-r-md cursor-pointer ${dark ? 'text-slate-400 hover:bg-slate-800 shadow-emerald-800 bg-slate-900':'shadow-sky-700 text-sky-700'}`}
            onClick={() => {
             setOrderNumber('')
              setSearch(false);
            }}
          />
        ) : (
          <BiSearchAlt
          className={`w-10 h-8  shadow-md rounded-r-md cursor-pointer ${dark ? 'text-slate-400 hover:bg-slate-800 shadow-emerald-800 bg-slate-900':'shadow-sky-700 text-sky-700'}`}
            onClick={() => setSearch(true)}
          />
        )}
      </div>
      <div
        className={`overflow-auto  relative shadow-md ${
          dark ? "shadow-emerald-600" : "shadow-sky-700"
        }  mx-4 rounded-md h-[80vh] mt-4 scrollbar-thin  hover:scrollbar-thumb-slate-600`}
      >
        <table className={`w-full md:text-md lg:text-lg text-xs`}>
          <thead
            className={`sticky top-0  shadow-md z-30 ${
              dark
                ? "shadow-emerald-600 text-white bg-slate-900"
                : "shadow-sky-700 bg-slate-800"
            } `}
          >
            <tr className={`w-full h-14 ${dark ? "" : "text-slate-300"}`}>
              <th className="px-2">
                <div className="flex justify-center">
                  <AiOutlineFieldNumber className="text-3xl font-bold" />
                </div>
              </th>
              <th>
                <div className="flex justify-center text-lg">
                  Order
                  <AiOutlineFieldNumber className=" text-3xl font-bold" />
                </div>
              </th>
              <th className="px-2">
                <div className="flex justify-center">Date</div>
              </th>
              <th className="px-2">
                <div className="flex justify-center">Customer Name</div>
              </th>
              <th className="px-2">
                <div className="flex justify-center">Address</div>
              </th>
              <th className="px-2">
                <div className="flex justify-center">Products</div>
              </th>
              <th className="px-2">
                <div className="flex justify-center">Quantity</div>
              </th>
              <th className="px-2">
                <div className="flex justify-center">Total</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {homeOrders.filter((el)=>{
              if(search){
                return el.order_number === parseInt(order_number)
              }
              return el
             }).map((el, index) => {
              return (
                <tr
                  key={el.id}
                  className={`shadow-md shadow-slate-600 ${
                    dark
                      ? "hover:bg-slate-900 hover:text-white text-white"
                      : "hover:bg-slate-800 hover:text-white"
                  }  cursor-pointer  h-20 font-bold`}
                >
                  <td>
                    <div className="flex justify-center items-center">
                      <div
                        className={`rounded-full w-5 h-5 md:w-10 md:h-10 flex items-center justify-center  border-2 ${
                          dark ? "border-emerald-600" : "border-slate-400"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>
                  </td>
                  <td >
                    <div className="flex justify-center items-center">
                      <div
                        className={`p-1 rounded-md  ${
                          dark ? "shadow-emerald-600" : "shadow-sky-700"
                        } shadow-md flex items-center justify-center`}
                      >
                        {el.order_number}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      className={`flex justify-center items-center text-md flex-col rounded-md shadow-md ${
                        dark ? "shadow-emerald-600" : "shadow-sky-700"
                      }`}
                    >
                      <div className="text-center">
                        {new Date(el.processed_at).toDateString()}
                      </div>
                      <div className="text-center">
                        {new Date(el.processed_at).toLocaleTimeString()}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      className={`flex justify-center items-center shadow-md rounded-md mx-2 ${
                        dark ? "shadow-emerald-600" : "shadow-sky-700"
                      }`}
                    >
                      {`${el.billing_address.first_name} ${el.billing_address.last_name}`}
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center items-center p-5">
                      <div
                        className={`flex flex-col  items-start text-xs p-1 ${
                          dark ? "shadow-emerald-600" : "shadow-sky-700"
                        } shadow-md rounded-md min-w-[15rem] max-w-[15rem]`}
                      >
                        <span>
                          {`Name:${el.shipping_address.first_name} ${el.shipping_address.last_name}`}
                        </span>
                        <span>{`Address:${el.shipping_address.address1}`}</span>
                        <span>{`${el.shipping_address.address2}`}</span>
                        <span>{`${el.shipping_address.city}`}</span>
                        <span>{`${el.shipping_address.province}`}</span>
                        <span>{`${el.shipping_address.phone}`}</span>
                        <span>{`${el.shipping_address.country}`}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      className={`flex flex-col min-h-[5rem] max-h-[10rem] max-w-[20rem] p-4 my-1 border ${
                        dark ? "border-emerald-600" : "border-sky-700"
                      } rounded-md overflow-auto scrollbar-thin text-xs`}
                    >
                      {el.line_items.map((el, index) => {
                        return (
                          <div
                            key={index}
                            className={`my-2 rounded-md p-2 shadow-md ${
                              dark ? "shadow-emerald-600" : "shadow-sky-700"
                            } `}
                          >
                            <div className="flex flex-col justify-center items-center">
                              <div>
                                {el.name}
                                <span
                                  className={`bg-red-400 rounded-md ml-1 px-1`}
                                >
                                  {el.quantity}
                                </span>
                              </div>
                              {el.properties.length === 0 ? (
                                <></>
                              ) : (
                                <div
                                  className={`border rounded-md flex flex-col justify-center items-center my-2 p-2`}
                                >
                                  {el.properties.map((el, index) => {
                                    return (
                                      <div key={index}>
                                        <span>{`${el.name} ${el.value}`}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      {el.line_items.length}
                    </div>
                  </td>
                  <td>
                    <div
                      className={`flex bg-slate-200 text-black justify-center rounded-md mx-2 `}
                    >
                      <div className="flex items-center">
                        <HiOutlineCurrencyRupee className="text-yellow-500" />
                        {el.total_price}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
