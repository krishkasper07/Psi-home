import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { orderContext, ThemeContext } from "../../App";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { RiDraftLine, RiDraftFill } from "react-icons/ri";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { BsFillBagFill } from "react-icons/bs";
import { BiFilter } from "react-icons/bi";
import { GiKnightBanner, GiNotebook } from "react-icons/gi";
import { motion } from "framer-motion";
import { FaShippingFast, FaBox } from "react-icons/fa";
import Select from "./selectCompo";
import Loading from "../../components/loading";
import axios from "axios";
export default function Dashboard() {
  const { dashOrders, updateDashOrders, getDashOrders } = useContext(orderContext);
  //const [search, setSearch] = useState(false);
  const { dark } = useContext(ThemeContext);
  const [showCustomerNotes, setCustomerNotes] = useState(false);
  const [showDraft, setDraft] = useState(false);
  const [showFree, setFree] = useState(false);
  const [showPriority, setPriority] = useState(false);
  const [showFilters, setFilters] = useState(false);
  const [search,setSearch] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [apply, setApply] = useState(false);
  const pendingRef = useRef({ checked: false });
  const dispatchRef = useRef({ checked: false });
  const onProcessRef = useRef({ checked: false });
  const partiallyCompletedRef = useRef({ checked: false });
  const designCompletedRef = useRef({ checked: false });
  const printingCompletedRef = useRef({ checked: false });
  const productSearchRef = useRef("");
  const [productSearch, setProductSearch] = useState(false);
  const [orderedDate, setOrderedDate] = useState("")
  const [showDispatchbtn, setDispatchbtn] = useState(false)
  const Dispatched = "Dispatched"
  let dashUrl = process.env.REACT_APP_UPDATESTATUS;
  const myOrders = () => {
    let arr = [];
    dashOrders.forEach((el) => {
      arr.push({
        order_number: el.order_number,
        products: el.products,
        deliveryType: el.deliveryType,
        orderDate: el.orderDate,
        notes: el.notes,
        productStatus: getDetails(el.products, "status"),
        productNames: getDetails(el.products, "name"),
        EventDates: getDetails(el.products, "Event Date"),
      });
    });
    return arr;
  };

  const getDetails = (products, option) => {
    let arr = [];
    products.forEach((el) => {
      if (option === "status") {
        arr.push(el.status);
      }
      if (option === "name") {
        arr.push(el.productName);
      }
      if (option === "Event Date") {
        if (el.properties.length === 0) {
          arr.push("");
        }

        el.properties.forEach((el) => {
          if (el.name === "Event Date*") {
            arr.push(el.value);
          }
        });
      }
    });
    return arr;
  };

  useEffect(() => {
    let timer = 1000 * 60 * 2;
    const update = setInterval(() => {
      updateDashOrders();
      getDashOrders();
    }, timer);

    return () => {
      clearInterval(update);
    };
  }, []);

  const magicArr = myOrders();

  const dispatchAll = async (el) => {
    let order_number = el.order_number
    for (let i = 0; i < el.products.length; i++) {
      await axios.put(dashUrl, { order_number: order_number, status: Dispatched, id: i + 1 })
    }
    getDashOrders()
  }

  const bagCount = () => {
    let count = 0
    magicArr.forEach(el => {
      el.products.forEach(el => {
        if (el.productName.includes('Bag - 40 Pcs.') && el.status !== 'Dispatched') {
          count += 40
        }
        if (el.productName.includes('Bag - 10 Pcs.') && el.status !== 'Dispatched') {
          count += 10
        }
        if (el.productName.includes('Bag - 20 Pcs.') && el.status !== 'Dispatched') {
          count += 20
        }
      })
    })

    return count
  }

  if (dashOrders.length === 0) {
    return <Loading />;
  }

  return (
    <div className="absolute w-full h-[90vh] top-20">
      <div className="flex md:flex-row flex-col mx-2 md:mx-0">
        <BiFilter
          onClick={() => setFilters(!showFilters)}
          className={`text-xl block md:hidden ${dark ? "text-slate-600" : "text-blue-800"
            }`}
        />

        <div
          className={`md:h-[90vh] ${showFilters ? "block" : "hidden"
            }  md:block md:w-80 ${dark ? "bg-slate-800" : "bg-slate-50"
            } shadow-md flex-col justify-center`}
        >
          <div className={`flex justify-center mx-2 mt-2`}>
            <input
              type="text"
              placeholder="Search By Order No"
              onChange={(e)=>setSearch(e.target.value)}
              className={`border-none text-center font-extrabold placeholder:text-center outline-none w-56 h-8  ${dark
                ? "shadow-emerald-600 bg-slate-600 placeholder:text-slate-50 text-slate-50"
                : "shadow-blue-200 placeholder:text-blue-500 text-blue-500"
                } rounded-l-md shadow-md`}
            />
            {/* {search ? (
              <AiOutlineClose
                className={`w-10 h-8  shadow-md rounded-r-md cursor-pointer ${dark
                  ? "text-slate-400 hover:bg-slate-800 shadow-emerald-600 bg-slate-600"
                  : "shadow-blue-200 text-blue-500"
                  }`}
                onClick={() => {
                  searchRef.current.value = "";
                  setSearch(false);
                }}
              />
            ) : (
              <BiSearchAlt
                className={`w-10 h-8  shadow-md rounded-r-md cursor-pointer ${dark
                  ? "text-slate-400 hover:bg-slate-800 shadow-emerald-600 bg-slate-600"
                  : "shadow-blue-200 text-blue-500"
                  }`}
                onClick={() => setSearch(true)}
              />
            )} */}
          </div>
          <div
            className={`${dark ? "bg-slate-700 text-white" : "bg-blue-100 text-blue-800"
              } mt-2 flex flex-col items-center rounded-md mx-2  font-semibold`}
          >
            <div
              className={`${dark ? "text-slate-300" : "text-blue-500"
                } font-extrabold`}
            >
              Filter By Status
            </div>
            <div>
              <div>
                <input type="checkbox" ref={pendingRef} name="Pending" />
                <label htmlFor="Pending">Pending</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  ref={designCompletedRef}
                  name="Design Completed"
                />
                <label htmlFor="Design Completed">Design Completed</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  ref={partiallyCompletedRef}
                  name="partially Completed"
                />
                <label htmlFor="partially Completed">partially Completed</label>
              </div>
              <div>
                <input type="checkbox" ref={onProcessRef} name="on Process" />
                <label htmlFor="on Process">on Process</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  ref={printingCompletedRef}
                  name="Printing Completed"
                />
                <label htmlFor="Printing Completed">Printing Completed</label>
              </div>
              <div>
                <input type="checkbox" ref={dispatchRef} name="Dispatched" />
                <label htmlFor="Dispatched">Dispatched</label>
              </div>
            </div>
            <div>
              <button
                className={`m-2 shadow-md bg-blue-600 shadow-blue-800 rounded-md p-1 text-white`}
                onClick={() => {
                  if (
                    pendingRef.current.checked ||
                    onProcessRef.current.checked ||
                    partiallyCompletedRef.current.checked ||
                    printingCompletedRef.current.checked ||
                    designCompletedRef.current.checked ||
                    dispatchRef.current.checked
                  ) {
                    setApply(true);
                  }
                }}
              >
                Apply Filter
              </button>
              <button
                className={`m-2 shadow-md bg-red-600 shadow-red-700 rounded-md p-1 text-white`}
                onClick={() => {
                  setApply(false);
                  pendingRef.current.checked = false;
                  onProcessRef.current.checked = false;
                  partiallyCompletedRef.current.checked = false;
                  designCompletedRef.current.checked = false;
                  printingCompletedRef.current.checked = false;
                  dispatchRef.current.checked = false;
                }}
              >
                Clear Filter
              </button>
            </div>
          </div>
          <div
            className={`flex flex-col justify-center items-center rounded-md p-2 m-2  `}
          >
            <span
              className={`${dark ? "text-slate-300" : "text-blue-500"
                } font-extrabold m-1`}
            >
              Filter By Event Date
            </span>
            <input
              type="date"
              onChange={(e) => setEventDate(e.target.value)}
              className={`${dark ? "bg-slate-600 text-white" : ""
                } shadow-md border-none outline-none rounded-md p-1`}
            />
          </div>
          <div className={`flex justify-center`}>
            <input
              type="text"
              placeholder="Search By Product Name"
              ref={productSearchRef}
              className={`border-none text-center font-extrabold placeholder:text-center outline-none w-56 h-8  ${dark
                ? "shadow-emerald-600 bg-slate-600 placeholder:text-slate-50 text-slate-50"
                : "shadow-blue-200 placeholder:text-blue-500 text-blue-500"
                } rounded-l-md shadow-md`}
            />
            {productSearch ? (
              <AiOutlineClose
                className={`w-10 h-8  shadow-md rounded-r-md cursor-pointer ${dark
                  ? "text-slate-400 hover:bg-slate-800 shadow-emerald-600 bg-slate-600"
                  : "shadow-blue-200 text-blue-500"
                  }`}
                onClick={() => {
                  productSearchRef.current.value = "";
                  setProductSearch(false);
                }}
              />
            ) : (
              <BiSearchAlt
                className={`w-10 h-8  shadow-md rounded-r-md cursor-pointer ${dark
                  ? "text-slate-400 hover:bg-slate-800 shadow-emerald-600 bg-slate-600"
                  : "shadow-blue-200 text-blue-500"
                  }`}
                onClick={() => setProductSearch(true)}
              />
            )}
          </div>
          <div className={`flex flex-col m-4 items-center justify-center`}>
            <div className={`m-4 relative`}>
              <BsFillBagFill
                className={`text-4xl  ${dark ? "text-slate-600" : "text-blue-800"
                  }`}
              />
              <span
                className={`absolute top-4 rounded-full text-white font-bold flex justify-center items-center -right-3 ${dark ? "bg-blue-800" : "bg-red-600"
                  }`}
              >
                {bagCount()}
              </span>
            </div>
            <div
              className={`flex flex-col justify-center items-center rounded-md p-2 m-2  `}
            >
              <span
                className={`${dark ? "text-slate-300" : "text-blue-500"
                  } font-extrabold m-1`}
              >
                Filter By Ordered Date
              </span>
              <input
                type="date"
                onChange={(e) => setOrderedDate(e.target.value)}
                className={`${dark ? "bg-slate-600 text-white" : ""
                  } shadow-md border-none outline-none rounded-md p-1`}
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`flex justify-center items-center w-full`}
          >
            <div
              className={`flex justify-center shadow-md rounded-md items-center  p-1 ${dark
                ? "shadow-emerald-600 hover:bg-emerald-500 text-slate-100 hover:text-white"
                : "hover:bg-blue-800 hover:text-white text-blue-800"
                }`}
              onClick={() => setCustomerNotes(!showCustomerNotes)}
            >
              <GiNotebook className={`text-4xl ${dark ? "" : ""}`} />
              <span className={` ${dark ? "" : ""} font-extrabold`}>
                Show customer Notes
              </span>
            </div>
          </motion.button>
          <div
            className={`w-full my-2  flex justify-center items-center text-4xl  flex-col ${dark ? "text-slate-600" : "text-blue-800"
              }`}
          >
            <MdOutlineDeliveryDining
              onClick={() => setFree(!showFree)}
              className={`cursor-pointer  ${dark
                ? `${showFree ? "text-blue-400" : ""}`
                : `${showFree ? "text-red-500" : ""}`
                }`}
            />
            <FaShippingFast
              onClick={() => setPriority(!showPriority)}
              className={`cursor-pointer  ${dark
                ? `${showPriority ? "text-blue-400" : ""}`
                : `${showPriority ? "text-red-500" : ""}`
                }`}
            />
            <RiDraftFill
              onClick={() => setDraft(!showDraft)}
              className={`cursor-pointer  ${dark
                ? `${showDraft ? "text-blue-400" : ""}`
                : `${showDraft ? "text-red-500" : ""}`
                }`}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`flex justify-center items-center w-full`}
          >
            <div
              className={`flex justify-center shadow-md rounded-md items-center  p-1 ${dark
                ? "shadow-emerald-600 hover:bg-emerald-500 text-slate-100 hover:text-white"
                : "hover:bg-blue-800 hover:text-white text-blue-800"
                }`}
              onClick={() => setDispatchbtn(!showDispatchbtn)}
            >
              <FaBox className={`text-4xl ${dark ? "" : ""}`} />
              <span className={` ${dark ? "" : ""} font-extrabold ml-1`}>
                Dispatch Mode
              </span>
            </div>
          </motion.button>
        </div>
        <div
          className={`shadow-md border-2 ${dark ? "border-slate-600" : "border-blue-800"
            } ${dark ? "shadow-slate-600" : "shadow-blue-200"
            } w-full my-4  md:my-0 md:mx-2 rounded-md hover:scrollbar-thumb-blue-800 overflow-auto h-[90vh] scrollbar-thin`}
        >
          <table
            className={`w-full md:text-md lg:text-lg text-xs ${dark ? "text-white" : "text-blue-900"
              }`}
          >
            <thead
              className={`sticky top-0 z-10 ${dark ? "bg-slate-800" : "bg-blue-900 text-white"
                } w-full h-14`}
            >
              <tr>
                <th>
                  <div className={`border  flex justify-center w-16 ml-1`}>
                    S:No
                  </div>
                </th>
                <th>
                  <div className={`border  flex justify-center w-40`}>
                    Order
                  </div>
                </th>
                <th>
                  <div className={` border flex justify-center w-36`}>Date</div>
                </th>
                <th>
                  <div className={`flex`}>
                    <div className={`w-96 border `}>Product Name</div>
                    <div className={`w-52 border `}>Status</div>
                    <div className={`border w-36 `}>Event Date</div>
                    <div className={`w-40 border `}>Designer Notes</div>
                    <div className={`w-40 border `}>Designer</div>
                    <div className={`w-40 border `}>Designed Date</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {magicArr
                .filter((el) => {
                  //order number filter
                  if (search.length >4 ) {
                    let input = parseInt(search);
                    return el.order_number === input;
                  } 
                  return el;
                }).filter((el) => {
                  if (orderedDate.length > 0) {
                    return (el.orderDate.includes(orderedDate))
                  }
                  return el
                })
                .filter((el) => {
                  //filter for order Delivery Type
                  if (showFree || showPriority || showDraft) {
                    return (
                      el.deliveryType.includes(
                        showFree ? "FREE DELIVERY" : null
                      ) ||
                      el.deliveryType.includes(
                        showPriority ? "PRIORITY DELIVERY" : null
                      ) ||
                      el.deliveryType.includes(showDraft ? "draft order" : null)
                    );
                  }
                  return el;
                })
                .filter((el) => {
                  if (eventDate.length > 4) {
                    let input = eventDate.split("-").reverse().join("-");
                    return el.EventDates.includes(input);
                  }
                  return el;
                })
                .filter((el) => {
                  if (apply) {
                    return (
                      el.productStatus.includes(
                        pendingRef.current.checked ? "pending" : null
                      ) ||
                      el.productStatus.includes(
                        onProcessRef.current.checked ? "On Process" : null
                      ) ||
                      el.productStatus.includes(
                        partiallyCompletedRef.current.checked
                          ? "Partially Completed"
                          : null
                      ) ||
                      el.productStatus.includes(
                        designCompletedRef.current.checked
                          ? "Design Completed"
                          : null
                      ) ||
                      el.productStatus.includes(
                        printingCompletedRef.current.checked
                          ? "Printing Completed"
                          : null
                      ) ||
                      el.productStatus.includes(
                        dispatchRef.current.checked ? "Dispatched" : null
                      )
                    );
                  }
                  return el;
                })
                .filter((el) => {
                  if (
                    productSearch &&
                    productSearchRef.current.value.length > 2
                  ) {
                    let searchTrim =
                      productSearchRef.current.value.toLowerCase();
                    return el.productNames
                      .toString()
                      .toLowerCase()
                      .includes(searchTrim);
                  }
                  return el;
                })
                .map((el, index) => {
                  return (
                    <tr
                      key={index}
                      className={`border-b-2 font-bold cursor-pointer ${dark
                        ? `border-slate-600 hover:bg-slate-900 hover:text-white ${el.deliveryType.includes("PRIORITY DELIVERY")
                          ? "bg-pink-700"
                          : ""
                        }`
                        : `border-blue-800 hover:bg-blue-100 ${el.deliveryType.includes("PRIORITY DELIVERY")
                          ? "bg-rose-600 text-white hover:text-blue-800"
                          : ""
                        }`
                        }`}
                    >
                      <td
                        className={`border-r-2 ${dark ? "border-slate-600" : "border-blue-800"
                          }`}
                      >
                        <div className={`flex flex-col items-center justify-center`}>
                          {index + 1}
                          {showDispatchbtn ? <>
                            <FaBox onClick={() => dispatchAll(el)} className={`${dark ? "text-yellow-500" : ""}`} /></> : <></>}
                        </div>
                      </td>
                      <td
                        className={`border-r-2  ${dark ? "border-slate-600" : "border-blue-800"
                          }`}
                      >
                        <div className={`flex items-center justify-center `}>
                          {el.order_number}
                          {el.deliveryType.includes("PRIORITY DELIVERY") ? (
                            <FaShippingFast className={`text-3xl`} />
                          ) : null}
                          {el.deliveryType.includes("FREE DELIVERY") ? (
                            <MdOutlineDeliveryDining className={`text-3xl`} />
                          ) : null}
                          {el.deliveryType.includes("draft order") ? (
                            <RiDraftLine className={`text-3xl`} />
                          ) : null}
                        </div>
                      </td>
                      <td
                        className={`border-r-2  ${dark ? "border-slate-600" : "border-blue-800"
                          }`}
                      >
                        <div className={`flex items-center justify-center`}>
                          <div className={`flex flex-col`}>
                            <div className={`text-center`}>
                              {new Date(el.orderDate).toLocaleDateString()}
                            </div>
                            <div>
                              {new Date(el.orderDate).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {el.products
                          .filter((el) => {
                            if (apply) {
                              return (
                                el.status.includes(
                                  pendingRef.current.checked ? "pending" : null
                                ) ||
                                el.status.includes(
                                  onProcessRef.current.checked
                                    ? "On Process"
                                    : null
                                ) ||
                                el.status.includes(
                                  partiallyCompletedRef.current.checked
                                    ? "Partially Completed"
                                    : null
                                ) ||
                                el.status.includes(
                                  designCompletedRef.current.checked
                                    ? "Design Completed"
                                    : null
                                ) ||
                                el.status.includes(
                                  printingCompletedRef.current.checked
                                    ? "Printing Completed"
                                    : null
                                ) ||
                                el.status.includes(
                                  dispatchRef.current.checked
                                    ? "Dispatched"
                                    : null
                                )
                              );
                            }
                            return el;
                          })
                          .filter((el) => {
                            if (
                              productSearch &&
                              productSearchRef.current.value.length > 2
                            ) {
                              let searchTrim =
                                productSearchRef.current.value.toLowerCase();
                              return el.productName
                                .toLowerCase()
                                .includes(searchTrim);
                            }
                            return el;
                          })
                          .map((el) => {
                            return (
                              <div key={el.id} className={`flex`}>
                                <div
                                  className={
                                    "flex justify-center items-center flex-col w-96 relative"
                                  }
                                >
                                  <div
                                    className={`shadow-md border-2 p-1 ${dark
                                      ? `border-emerald-600 ${el.productName.includes("Bag") ||
                                        el.productName.includes("bag")
                                        ? "bg-violet-600 shadow-emerald-600 text-white"
                                        : ""
                                      }`
                                      : `border-blue-800 ${el.productName.includes("Bag") ||
                                        el.productName.includes("bag")
                                        ? "bg-violet-500 shadow-emerald-600 text-white"
                                        : ""
                                      }`
                                      } rounded-md flex justify-center items-center w-80 my-2 `}
                                  >
                                    {el.productName}
                                    {el.productName.includes("Bag") ||
                                      el.productName.includes("bag") ? (
                                      <BsFillBagFill
                                        className={`text-3xl ${dark
                                          ? "text-green-300"
                                          : "text-emerald-400"
                                          }`}
                                      />
                                    ) : null}


                                  </div>
                                  {(el.productName.includes("Classic") &&
                                    el.productName.includes("Kit")) ||
                                    el.productName.includes("2x3") ||
                                    el.productName.includes("6x4") ||
                                    (el.productName.includes("2x1.5") &&
                                      !el.productName.includes("Cutout")) ||
                                    el.productName.includes("8x6") ||
                                    (el.productName.includes("Exclusive") &&
                                      el.productName.includes("Kit")) ||
                                    (el.productName.includes("Premium") &&
                                      el.productName.includes("Kit")) ||
                                    el.productName.includes("6X4 ") ||
                                    el.productName.includes("2X1.5 ") ? (
                                    <GiKnightBanner
                                      className={`w-10 text-3xl absolute top-2 left-0 ${dark
                                        ? "text-green-300"
                                        : "text-emerald-400"
                                        }`}
                                    />
                                  ) : null}
                                  <span
                                    className={`absolute w-6 h-6  flex items-center justify-center rounded-full right-5 top-1 ${dark
                                      ? "bg-violet-700 text-white"
                                      : "bg-blue-800 text-white"
                                      }`}
                                  >
                                    {el.quantity}
                                  </span>

                                  {el.properties.length === 0 ? (
                                    <></>
                                  ) : (
                                    <>
                                      <div
                                        className={`w-80 h-20 shadow text-center scrollbar-thin rounded-md border-2 my-1 overflow-auto text-xs ${dark
                                          ? "border-pink-500 backdrop-blur-2xl bg-pink-800"
                                          : "border-cyan-200 backdrop-blur-2xl bg-cyan-500 text-white"
                                          } ${showCustomerNotes ? "block" : "hidden"
                                          }`}
                                      >
                                        {el.properties.map((el, index) => {
                                          return (
                                            <span
                                              key={index}
                                            >{`${el.name}-${el.value}`}</span>
                                          );
                                        })}
                                      </div>
                                    </>
                                  )}
                                </div>
                                <div
                                  className={`flex justify-center items-center w-52 border-x-2  ${dark
                                    ? "border-slate-600"
                                    : "border-blue-800"
                                    }`}
                                >
                                  <Select el={el} />
                                </div>
                                <div
                                  className={`w-36  flex justify-center items-center border-r-2  ${dark
                                    ? "border-slate-600"
                                    : "border-blue-800"
                                    }`}
                                >
                                  {el.properties.length === 0 ? (
                                    <></>
                                  ) : (
                                    <>
                                      <div
                                        className={`shadow-md p-1 rounded-md my-2 flex justify-center items-center border-2 ${dark
                                          ? "border-emerald-600"
                                          : "border-blue-800"
                                          }`}
                                      >
                                        {el.properties.map((el) =>
                                          el.name === "Event Date*"
                                            ? el.value
                                            : null
                                        )}
                                      </div>
                                    </>
                                  )}
                                </div>
                                <div
                                  className={`w-40 flex justify-center items-center border-r-2  ${dark
                                    ? "border-slate-600"
                                    : "border-blue-800"
                                    }`}
                                >
                                  <textarea
                                    className={`w-36 h-10 border-2 rounded-md ${dark
                                      ? "border-emerald-600 text-black"
                                      : "border-blue-800"
                                      }`}
                                  />
                                </div>
                                <div
                                  className={`w-40 flex justify-center items-center border-r-2  ${dark
                                    ? "border-slate-600"
                                    : "border-blue-800"
                                    }`}
                                >
                                  {el.designerName.length > 2 ? (
                                    <div
                                      className={`border-2 ${dark
                                        ? "border-cyan-200 bg-cyan-600 text-white"
                                        : "border-blue-400 bg-blue-800 text-white"
                                        } flex justify-center items-center px-2 rounded-md`}
                                    >
                                      {el.designerName}
                                    </div>
                                  ) : null}
                                </div>
                                <div
                                  className={`w-40 flex justify-center items-center`}
                                >
                                  {el.designedDate.length > 2 ? (
                                    <div
                                      className={`border-2 ${dark
                                        ? "border-rose-200 bg-rose-600 text-white"
                                        : "border-cyan-400 bg-cyan-800 text-white"
                                        } flex justify-center items-center px-2 rounded-md flex-col`}
                                    >
                                      <div>
                                        {new Date(
                                          el.designedDate
                                        ).toLocaleDateString()}
                                      </div>
                                      <div>
                                        {new Date(
                                          el.designedDate
                                        ).toLocaleTimeString()}
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
