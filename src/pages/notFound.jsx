import React from 'react'
import notfound from '../assets/404.gif';
function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center h-[100vh]'>
      <img src={notfound} alt="notFoundGif"/>
      <span className='text-5xl text-center text-yellow-300 font-extrabold '>Page not Found</span>
      </div>
  )
}

export default NotFound