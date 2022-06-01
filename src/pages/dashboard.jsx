import React from 'react';
import {useContext} from 'react';
import {orderContext }from '../App';

export default function Dashboard() {
  const {dashOrders}=useContext(orderContext);
  console.log('dash:',dashOrders)
  return (
    <div  className="absolute top-20">dashboard</div>
  )
}
