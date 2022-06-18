import React from 'react';
import loader from '../assets/fluid-loader.gif';

export default function Loading() {
  return (
    <div className={`flex justify-center items-center h-[100vh]`}>
        <img src={loader} className='' alt="loader"/>
    </div>
  )
}
