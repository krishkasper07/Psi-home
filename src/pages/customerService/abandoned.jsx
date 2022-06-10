import React, { useContext, useState } from "react";
import { RiBillLine } from "react-icons/ri";
import { MdOutlineLocalShipping } from "react-icons/md";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { GiModernCity } from "react-icons/gi";
import country from "../../assets/country.png";
import region from "../../assets/region.png";
import people from "../../assets/people.png";
import { BsTelephoneForward } from "react-icons/bs";
import { TiCloudStorage } from "react-icons/ti";
import { BiSearchAlt } from "react-icons/bi";
import shopify from "../../assets/shopify.png";
import save from "../../assets/save.png";
import { motion } from "framer-motion";
import { AiOutlineFieldNumber, AiOutlineClose } from "react-icons/ai";
import { useRef } from "react";
import { orderContext, ThemeContext } from "../../App";
import axios from "axios";
import toast from "react-hot-toast";
import SavedCustomers from "./savedCustomers";

function Abandoned() {
  const { abandonedOrders } = useContext(orderContext);
  const [search, setSearch] = useState(false);
  const { dark } = useContext(ThemeContext);
  const inputRef = useRef(null);
  const [savedCustomers, setSavedCustomers] = useState(false);
  const saveCustomer = async (order) => {
    let url = process.env.REACT_APP_SAVE_CUSTOMER_URL;
    let data = {
      abandoned_checkout_url: order.abandoned_checkout_url,
      customerName: `${order.billing_address.first_name} ${order.billing_address.last_name}`,
      address1: order.billing_address.address1,
      address2: order.billing_address.address2,
      city: order.billing_address.city,
      state: order.billing_address.province,
      country: order.billing_address.country,
      zip: order.billing_address.zip,
      phone: order.billing_address.phone,
      lastOrderPricing: order.total_price,
    };
    await axios
      .post(url, data)
      .then((res) =>
        toast(res.data, {
          icon: "🙋‍♂️",
          style: dark
            ? {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              }
            : {},
        })
      )
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="relative">
        <div className={"absolute top-20 right-6"}>
          {savedCustomers ? (
            <button
              onClick={() => setSavedCustomers(false)}
              className={`text-xs p-1  rounded-md shadow-md text-white ${
                dark
                  ? "bg-emerald-600 shadow-emerald-200"
                  : "bg-blue-800 shadow-blue-200"
              }`}
            >
              Unsaved Customers
            </button>
          ) : (
            <button
              onClick={() => setSavedCustomers(true)}
              className={`text-xs p-1  rounded-md shadow-md text-white ${
                dark
                  ? "bg-emerald-600 shadow-emerald-400"
                  : "bg-blue-800 shadow-blue-200"
              }`}
            >
              Saved Customers
            </button>
          )}
        </div>
        {savedCustomers ? (
          <>
          <SavedCustomers/>
          </>
        ) : (
          <div
            className={`overflow-hidden h-[90vh] rounded-md ${
              dark ? "text-white" : ""
            } absolute top-24 w-full`}
          >
            <div className="flex justify-center items-center mt-4 ">
              <input
                ref={inputRef}
                placeholder="Search By Name, City, State (or) Phone"
                type="text"
                className={`shadow-md shadow-blue-800 w-72 text-xs md:text-lg md:w-96 h-8 p-1 placeholder:text-center font-bold  ${
                  dark
                    ? "bg-slate-900 text-slate-400 shadow-emerald-800 hover:bg-slate-800"
                    : "placeholder:text-black"
                } rounded-l-md border-none outline-none`}
              />
              {search ? (
                <AiOutlineClose
                  className={`w-10 h-8 shadow-blue-800 shadow-md rounded-r-md cursor-pointer ${
                    dark
                      ? "text-slate-400 hover:bg-slate-800 shadow-emerald-800 bg-slate-900"
                      : ""
                  }`}
                  onClick={() => {
                    inputRef.current.value = "";
                    setSearch(false);
                  }}
                />
              ) : (
                <BiSearchAlt
                  className={`w-10 h-8 shadow-blue-800 shadow-md rounded-r-md cursor-pointer ${
                    dark
                      ? "text-slate-400 hover:bg-slate-800 shadow-emerald-800 bg-slate-900"
                      : ""
                  }`}
                  onClick={() => setSearch(true)}
                />
              )}
            </div>
            <div
              className={`overflow-auto  relative border-4 ${
                dark ? "border-emerald-800 " : "border-blue-800"
              }  mx-4 rounded-md h-[80vh] mt-4 scrollbar-thin  scrollbar-thumb-slate-600 scrollbar-thumb-rounded-full`}
            >
              <table className={`w-full md:text-md lg:text-lg text-xs`}>
                <thead className="sticky top-0 bg-slate-900 shadow-md shadow-slate-600">
                  <tr className={`w-full h-14 ${dark ? "" : "text-white"}`}>
                    <th className="px-2">
                      <div className="flex justify-center">
                        <AiOutlineFieldNumber className="md:text-4xl font-bold" />
                      </div>
                    </th>
                    <th className="px-2">
                      <div className="flex justify-center items-center">
                        <img
                          src={people}
                          alt="state"
                          className="w-5 h-5 md:w-10 md:h-10"
                        />
                        Customer Names
                      </div>
                    </th>
                    <th className="px-2">
                      <div className="flex justify-center items-center">
                        <GiModernCity className="mx-1 text-blue-600" />
                        City
                      </div>
                    </th>
                    <th className="px-2">
                      <div className="flex justify-center items-center">
                       Zip
                      </div>
                    </th>
                    <th className="px-2">
                      <div className="flex justify-center items-center">
                        <img
                          src={region}
                          alt="state"
                          className="w-5 h-5 md:w-10 md:h-10"
                        />
                        State
                      </div>
                    </th>
                    <th className="px-3">
                      <div className="flex justify-center items-center">
                        <img
                          src={country}
                          alt="state"
                          className="w-5 h-5 md:w-10 md:h-10"
                        />
                        Country
                      </div>
                    </th>
                    <th className="px-2">
                      <div className="flex justify-center items-center">
                        <BsTelephoneForward className="text-green-500" />
                        Contact Info
                      </div>
                    </th>
                    <th className="px-2">
                      <div className="flex justify-center items-center">
                        <HiOutlineCurrencyRupee className="text-yellow-500" />
                        Order pricing
                      </div>
                    </th>
                    <th className="px-3">
                      <div className="flex justify-center items-center">
                        <img
                          src={save}
                          alt="state"
                          className="w-5 h-5 md:w-10 md:h-10"
                        />
                        Save Customer
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {abandonedOrders
                    .filter((el) => {
                      return el.billing_address !== undefined;
                    })
                    .filter((el) => {
                      if (search) {
                        let input = inputRef.current.value.toLowerCase();
                        return (
                          el.billing_address.first_name
                            .toLowerCase()
                            .includes(input) ||
                          el.shipping_address.first_name
                            .toLowerCase()
                            .includes(input) ||
                          el.shipping_address.city
                            .toLowerCase()
                            .includes(input) ||
                          el.shipping_address.province
                            .toLowerCase()
                            .includes(input) ||
                          el.shipping_address.phone
                            .toLowerCase()
                            .includes(input)
                        );
                      }
                      return el;
                    })
                    .map((order, index) => {
                      return (
                        <tr
                          key={order.id}
                          className={`shadow-md shadow-slate-600 ${
                            dark
                              ? "hover:bg-white hover:text-black"
                              : "hover:bg-slate-800 hover:text-white"
                          }  cursor-pointer  h-20 font-bold`}
                        >
                          <td>
                            <div className="flex justify-center items-center">
                              <div className="rounded-full w-5 h-5 md:w-10 md:h-10 flex items-center justify-center  border-2 border-slate-400">
                                {index + 1}
                              </div>
                            </div>
                          </td>
                          <td>
                            {order.billing_address !== undefined ? (
                              <div className="flex justify-center items-center">
                                <RiBillLine className="text-xl text-lime-500" />{" "}
                                {`${order.billing_address.first_name} ${order.billing_address.last_name}`}
                              </div>
                            ) : (
                              <div></div>
                            )}
                            {order.shipping_address !== undefined ? (
                              <div className="flex justify-center items-center">
                                <MdOutlineLocalShipping className="text-xl text-yellow-400" />{" "}
                                {`${order.shipping_address.first_name} ${order.shipping_address.last_name}`}
                                <a
                                  href={order.abandoned_checkout_url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <img
                                    src={shopify}
                                    alt="shopify"
                                    className="w-10 h-10"
                                  />
                                </a>
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </td>
                          <td>
                            {order.billing_address !== undefined ? (
                              <div className="flex justify-center items-center">
                                {`${order.billing_address.city}`}
                              </div>
                            ) : (
                              <div></div>
                            )}
                            {order.shipping_address !== undefined ? (
                              <div className="flex justify-center items-center">
                                {`${order.shipping_address.city}`}
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </td>
                          <td>
                            {order.billing_address !== undefined ? (
                              <div className="flex justify-center items-center">
                                {`${order.billing_address.zip}`}
                              </div>
                            ) : (
                              <div></div>
                            )}
                            {order.shipping_address !== undefined ? (
                              <div className="flex justify-center items-center">
                                {`${order.shipping_address.zip}`}
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </td>
                          <td>
                            {order.billing_address !== undefined ? (
                              <div className="flex justify-center items-center">
                                {`${order.billing_address.province}`}
                              </div>
                            ) : (
                              <div></div>
                            )}
                            {order.shipping_address !== undefined ? (
                              <div className="flex justify-center items-center">
                                {`${order.shipping_address.province}`}
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </td>
                          <td>
                            {order.billing_address !== undefined ? (
                              <div className="flex justify-center items-center">
                                {`${order.billing_address.country}`}
                              </div>
                            ) : (
                              <div></div>
                            )}
                            {order.shipping_address !== undefined ? (
                              <div className="flex justify-center items-center">
                                {`${order.shipping_address.country}`}
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </td>
                          <td>
                            {order.billing_address !== undefined ? (
                              <div className="flex justify-center items-center">
                                {`${order.billing_address.phone}`}
                              </div>
                            ) : (
                              <div></div>
                            )}
                            {order.shipping_address !== undefined ? (
                              <div className="flex justify-center items-center">
                                {`${order.shipping_address.phone}`}
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </td>
                          <td>
                            <div className="flex justify-center items-center">
                              {order.total_price}
                            </div>
                          </td>
                          <td>
                            <div className="flex justify-center items-center">
                              <motion.button
                                whileHover={{ scale: 1.9 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-blue-800 px-2 rounded shadow-2xl shadow-blue-600 hover:text-white"
                                order={order}
                                onClick={() => saveCustomer(order)}
                              >
                                <TiCloudStorage className="text-3xl" />
                              </motion.button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Abandoned;
