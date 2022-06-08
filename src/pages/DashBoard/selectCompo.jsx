import React, { useContext } from "react";
import AuthContext from "../../authContext/authProvider";
import axios from "axios";
import { orderContext } from "../../App";
export default function Select({ el }) {
  const { user } = useContext(AuthContext);
  let dashUrl = process.env.REACT_APP_UPDATESTATUS;
  let {getDashOrders}=useContext(orderContext);
  const changeStatus=async(e)=>{
   let data= e.target.value === 'Dispatched'?{
    id:parseInt(e.target.id),
    order_number:el.order_number,
    status:e.target.value,
    designedDate:new Date()
  }:{
     id:parseInt(e.target.id),
     order_number:el.order_number,
     status:e.target.value,
     designerName:user.userName,
     designedDate:new Date()
   }

   await axios.put(dashUrl,data).then(res=>{
     getDashOrders();
   })
  }
  return (
    <select
      id={el.id}
      defaultValue={el.status}
      onChange={(e)=>changeStatus(e)}
      className={`rounded shadow-md p-1 w-44 cursor-pointer font-medium ${
        el.status === "pending" ? "bg-red-500 text-white" : ""
      }
${el.status === "Design Completed" ? "bg-blue-800 text-white" : ""}
${el.status === "Partially Completed" ? "bg-orange-500 text-white" : ""}
${el.status === "On Process" ? "bg-yellow-400 text-white" : ""}
${el.status === "Printing Completed" ? "bg-emerald-800 text-white" : ""}
${el.status === "Dispatched" ? "bg-green-600 text-white" : ""}`}
    >
      <option>{el.status}</option>
      <option className="bg-red-400">pending</option>
      <option className="bg-blue-400">Design Completed</option>
      <option className="bg-orange-400">Partially Completed</option>
      <option className="bg-yellow-400">On Process</option>
      <option className="bg-green-400">Printing Completed</option>
      <option className="bg-green-300">Dispatched</option>
    </select>
  );
}
