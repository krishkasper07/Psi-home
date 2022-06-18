import React, { useRef } from "react";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import {GiSave} from 'react-icons/gi';
import toast from "react-hot-toast";

export default function EditingRow({ el, dark, handleEditCustomer, index,getSavedCustomer }) {
  let updateUrl = process.env.REACT_APP_UPDATE_CUSTOMER;
  let deleteUrl=process.env.REACT_APP_DELETE_CUSTOMER;
  let abandoned_checkout_urlRef = useRef("");
  let customerNameRef = useRef("");
  let address1Ref = useRef("");
  let address2Ref = useRef("");
  let cityRef = useRef("");
  let stateRef = useRef("");
  let countryRef = useRef("");
  let zipRef = useRef("");
  let phoneRef = useRef("");
  let lastOrderPricingRef = useRef("");
  let notesRef = useRef("");



  const deleteCustomer=async(id)=>{
      await axios.delete(`${deleteUrl}/${id}`).then(res=>{
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
       handleEditCustomer(id)
       getSavedCustomer()
      }).catch(err=>console.log(err))
  }

  const updateCustomer=async(id)=>{
    let data =  {
      abandoned_checkout_url:await abandoned_checkout_urlRef.current.value,
      customerName:await customerNameRef.current.value,
      address1:await address1Ref.current.value ,
      address2:await address2Ref.current.value,
      city:await cityRef.current.value,
      state:await stateRef.current.value ,
      country:await countryRef.current.value,
      zip:await zipRef.current.value,
      phone:await phoneRef.current.value ,
      lastOrderPricing:await lastOrderPricingRef.current.value,
      notes:await notesRef.current.value
    };
   
    await axios.put(`${updateUrl}/${id}`,data).then(res=>{
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
      console.log(res.data)
     handleEditCustomer(id)
     getSavedCustomer()
    }).catch(err=>console.log(err))
  }
  return (
    <>
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
            <input
              type="text"
              defaultValue={el.customerName}
              ref={customerNameRef}
              className={`text-black text-center border-2 ${
                dark ? "border-emerald-600" : "border-blue-800"
              } outline-none rounded-md `}
            />
            <input
              type="text"
              ref={abandoned_checkout_urlRef}
              defaultValue={el.abandoned_checkout_url}
              className={`text-black text-center border-2 ${
                dark ? "border-emerald-600" : "border-blue-800"
              } outline-none rounded-md `}
            />
          </div>
        </td>
        <td>
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              defaultValue={el.address1}
              ref={address1Ref}
              className={`text-black text-center border-2 ${
                dark ? "border-emerald-600" : "border-blue-800"
              } outline-none rounded-md my-1`}
            />
            <input
              type="text"
              defaultValue={el.address2}
              ref={address2Ref}
              className={`text-black text-center border-2 ${
                dark ? "border-emerald-600" : "border-blue-800"
              } outline-none rounded-md `}
            />
          </div>
        </td>
        <td>
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              defaultValue={el.zip}
              ref={zipRef}
              className={`text-black text-center border-2 ${
                dark ? "border-emerald-600" : "border-blue-800"
              } outline-none rounded-md `}
            />
          </div>
        </td>
        <td>
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              defaultValue={el.city}
              ref={cityRef}
              className={`text-black text-center border-2 ${
                dark ? "border-emerald-600" : "border-blue-800"
              } outline-none rounded-md `}
            />
          </div>
        </td>
        <td>
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              ref={stateRef}
              defaultValue={el.state}
              className={`text-black text-center border-2 ${
                dark ? "border-emerald-600" : "border-blue-800"
              } outline-none rounded-md `}
            />
          </div>
        </td>
        <td>
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              defaultValue={el.country}
              ref={countryRef}
              className={`text-black text-center border-2 ${
                dark ? "border-emerald-600" : "border-blue-800"
              } outline-none rounded-md `}
            />
          </div>
        </td>
        <td>
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              defaultValue={el.phone}
              ref={phoneRef}
              className={`text-black text-center border-2 ${
                dark ? "border-emerald-600" : "border-blue-800"
              } outline-none rounded-md `}
            />
          </div>
        </td>
        <td>
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              defaultValue={el.lastOrderPricing}
              ref={lastOrderPricingRef}
              className={`text-black text-center border-2 ${
                dark ? "border-emerald-600" : "border-blue-800"
              } outline-none rounded-md `}
            />
          </div>
        </td>
        <td>
          <div className="flex flex-col justify-center items-center my-2">
            <textarea
              type="text"
              defaultValue={el.notes}
              ref={notesRef}
              className={`text-black text-center border-2 ${
                dark ? "border-emerald-600" : "border-blue-800"
              } outline-none rounded-md `}
            />
          </div>
        </td>
        <td>
          <div className="flex  justify-center items-center my-2">
            <GiSave
              className={`text-2xl text-emerald-500 mr-2`}
              onClick={()=>updateCustomer(el._id)}
            />
             <RiDeleteBin5Line
              className={`text-2xl text-red-500`}
              onClick={()=>deleteCustomer(el._id)}
            />
          </div>
        </td>
      </tr>
    </>
  );
}
