import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { ThemeContext } from "../../App";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { GiModernCity } from "react-icons/gi";
import country from "../../assets/country.png";
import region from "../../assets/region.png";
import people from "../../assets/people.png";
import { BsTelephoneForward } from "react-icons/bs";
import { AiOutlineFieldNumber, AiOutlineClose } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { IoIosPersonAdd } from "react-icons/io";
import { CgNotes } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { FaAddressCard, FaRegEdit } from "react-icons/fa";
import EditingRow from "./EditingRow";
import toast from "react-hot-toast";
export default function SavedCustomers() {
  const { dark } = useContext(ThemeContext);
  const [addCustomer, setAddCustomer] = useState(false);
  const [savedCustomers, setSavedCustomers] = useState([]);
  const [search, setSearch] = useState(false);
  const inputRef = useRef(null);
  let getSavedCustomersUrl = process.env.REACT_APP_SAVED_CUSTOMERS;
  let addCustomerUrl = process.env.REACT_APP_ADD_CUSTOMER;
  useEffect(() => {
    getSavedCustomer();
  }, []);
  const getSavedCustomer = async () => {
    axios
      .get(getSavedCustomersUrl)
      .then((res) =>
        setSavedCustomers(
          res.data.map((el) => {
            return {
              ...el,
              edit: false,
            };
          })
        )
      )
      .catch((err) => console.log(err));
  };
  const addNewCustomer = async (e) => {
    e.preventDefault();
    let data = {
      abandoned_checkout_url: e.target.link.value,
      customerName: e.target.name.value,
      address1: e.target.address1.value,
      address2: e.target.address2.value,
      city: e.target.city.value,
      state: e.target.state.value,
      country: e.target.country.value,
      zip: e.target.zip.value,
      phone: e.target.phone.value,
      lastOrderPricing: e.target.price.value,
    };
    await axios
      .post(addCustomerUrl, data)
      .then((res) => {
        toast(res.data, {
          icon: "🙋‍♂️",
          style: dark
            ? {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              }
            : {},
        });
        setAddCustomer(false);
        getSavedCustomer();
      })
      .catch((err) => toast(err.response.data.message, {
        icon: "🙋‍♂️",
        style: dark
          ? {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            }
          : {},
      }));
  };

  const handleEditCustomer = (id) => {
    const updatedcustomer = savedCustomers.map((customer) => {
      if (customer._id === id) {
        customer.edit = !customer.edit;
      }
      return customer;
    });
    setSavedCustomers(updatedcustomer);
  };

  return (
    <div
      className={`absolute top-28  w-full h-[85vh] flex flex-col md:flex-row`}
    >
      <div
        className={`w-96 ${addCustomer ? "block" : "hidden"} ${
          dark ? "border-emerald-600" : "border-blue-800"
        }  h-full`}
      >
        <div className={`flex justify-end`}>
          <AiOutlineClose
            className={`text-3xl ${
              dark ? "text-emerald-600" : "text-blue-800"
            } cursor-pointer font-extrabold`}
            onClick={() => setAddCustomer(false)}
          />
        </div>

        <form
          className={`flex flex-col  p-2  mx-2 shadow-md rounded-md ${
            dark
              ? "bg-slate-900 shadow-slate-800 text-white"
              : "bg-slate-50 shadow-blue-700 text-blue-800"
          } justify-center items-center font-bold`}
          onSubmit={addNewCustomer}
        >
          <div className={`flex justify-center items-center flex-col my-2`}>
            <label>Name*</label>
            <input
              type="text"
              name="name"
              className={`${
                dark ? "bg-slate-800" : "bg-blue-200"
              } border-none outline-none p-1 rounded-md`}
            />
          </div>
          <div className={`flex justify-center items-center flex-col my-2`}>
            <label>Address1</label>
            <input
              type="text"
              name="address1"
              className={`${
                dark ? "bg-slate-800" : "bg-blue-200"
              } border-none outline-none p-1 rounded-md`}
            />
          </div>
          <div className={`flex justify-center items-center flex-col my-2`}>
            <label>Address2</label>
            <input
              type="text"
              name="address2"
              className={`${
                dark ? "bg-slate-800" : "bg-blue-200"
              } border-none outline-none p-1 rounded-md`}
            />
          </div>
          <div className={`flex justify-center items-center flex-col my-2`}>
            <label>City</label>
            <input
              type="text"
              name="city"
              className={`${
                dark ? "bg-slate-800" : "bg-blue-200"
              } border-none outline-none p-1 rounded-md`}
            />
          </div>
          <div className={`flex justify-center items-center flex-col my-2`}>
            <label>State (or) province</label>
            <input
              type="text"
              name="state"
              className={`${
                dark ? "bg-slate-800" : "bg-blue-200"
              } border-none outline-none p-1 rounded-md`}
            />
          </div>
          <div className={`flex justify-center items-center flex-col my-2`}>
            <label>Country</label>
            <input
              type="text"
              name="country"
              className={`${
                dark ? "bg-slate-800" : "bg-blue-200"
              } border-none outline-none p-1 rounded-md`}
            />
          </div>
          <div className={`flex justify-center items-center flex-col my-2`}>
            <label>Zip</label>
            <input
              type="text"
              name="zip"
              className={`${
                dark ? "bg-slate-800" : "bg-blue-200"
              } border-none outline-none p-1 rounded-md`}
            />
          </div>
          <div className={`flex justify-center items-center flex-col my-2`}>
            <label>phone*</label>
            <input
              type="text"
              name="phone"
              className={`${
                dark ? "bg-slate-800" : "bg-blue-200"
              } border-none outline-none p-1 rounded-md`}
            />
          </div>
          <div className={`flex justify-center items-center flex-col my-2`}>
            <label>Last Order Price</label>
            <input
              type="text"
              name="price"
              className={`${
                dark ? "bg-slate-800" : "bg-blue-200"
              } border-none outline-none p-1 rounded-md`}
            />
          </div>
          <div className={`flex justify-center items-center flex-col my-2`}>
            <label className={`flex`}>
              Any Link
              <FiLink />
            </label>
            <input
              type="text"
              name="link"
              className={`${
                dark ? "bg-slate-800" : "bg-blue-200"
              } border-none outline-none p-1 rounded-md`}
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
            Add Customer
          </button>
        </form>
      </div>
      <div className={`w-full`}>
        <div className="flex flex-col justify-center items-center my-1">
          <IoIosPersonAdd
            className={`text-4xl mr-5 ${
              dark ? "text-emerald-600" : "text-blue-800"
            } cursor-pointer`}
            onClick={() => setAddCustomer(true)}
          />
          <div className={`flex my-1`}>
            <input
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
        </div>
        <div
          className={`border-4 ${
            dark ? "border-emerald-600" : "border-blue-800"
          }  mx-2 h-[75vh] rounded-md shadow-md overflow-auto`}
        >
          <table className={`w-full md:text-md lg:text-lg text-xs`}>
            <thead
              className={`sticky top-0 bg-slate-900 shadow-md shadow-slate-600 ${
                dark ? "text-slate-50" : ""
              }`}
            >
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
                <th>
                  <div className="flex justify-center items-center">
                    <FaAddressCard /> Address
                  </div>
                </th>
                <th className="px-2">
                  <div className="flex justify-center items-center">
                    <GiModernCity className="mx-1 text-blue-600" />
                    City
                  </div>
                </th>
                <th className="px-2">
                  <div className="flex justify-center items-center">Zip</div>
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
                    <CgNotes
                      className={`text-xl ${
                        dark ? "text-blue-600" : "text-yellow-300"
                      }`}
                    />
                    Notes
                  </div>
                </th>
                <th className="px-3">
                  <div className="flex justify-center items-center">
                    <FaUserEdit
                      className={`text-xl ${
                        dark ? "text-yellow-300" : "text-blue-200"
                      }`}
                    />
                    Edit
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {savedCustomers.map((el, index) => {
                return el.edit ? (
                  <EditingRow
                    dark={dark}
                    el={el}
                    index={index}
                    handleEditCustomer={handleEditCustomer}
                    getSavedCustomer={getSavedCustomer}
                    key={el._id}
                  />
                ) : (
                 
                    <tr
                      key={el._id}
                      className={`border-b-2  ${
                        dark
                          ? "hover:bg-white hover:text-black border-emerald-600 text-white"
                          : "hover:bg-slate-800 hover:text-white border-blue-800"
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
                        <div className="flex justify-center items-center">
                          {el.customerName}
                        </div>
                      </td>
                      <td>
                        <div className={`flex flex-col justify-center items-center rounded-md shadow-md ${dark ? 'bg-rose-600 text-white':'bg-violet-200 text-black' }`}>
                          <div>{el.address1}</div>
                          <div>{el.address2}</div>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col justify-center items-center">
                          {el.city}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col justify-center items-center">
                          {el.zip}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col justify-center items-center">
                          {el.state}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col justify-center items-center">
                          {el.country}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col justify-center items-center">
                          {el.phone}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col justify-center items-center">
                          {el.lastOrderPricing}
                        </div>
                      </td>
                      <td>
                        <div className={`flex flex-col flex-nowrap  h-16 justify-center  items-center rounded-md shadow-md ${dark ? 'bg-slate-600 text-white':'bg-blue-200 text-black' } my-2`}>
                          {el.notes.length < 1
                            ? "no notes added yet"
                            : el.notes}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col justify-center items-center my-2">
                          <FaRegEdit
                            className={`text-2xl`}
                            onClick={() => handleEditCustomer(el._id)}
                          />
                        </div>
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
