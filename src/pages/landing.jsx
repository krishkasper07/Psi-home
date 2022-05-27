import React from "react";
import NavBar from "../navbar/navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {BsArrowDownShort} from 'react-icons/bs';
import orders from '../assets/order.png';
import dash from '../assets/dash.png';
import qr from '../assets/qr.png';
import scan from '../assets/scan.gif';
import cs from '../assets/cs.gif';
import activity from '../assets/activity.gif';
import {useContext} from 'react'
import AuthContext from "../authContext/authProvider";

function LandingPage() {
  const navigate=useNavigate()
  const {user,logOutUser}=useContext(AuthContext)
  const food = [
    [orders,"Look Into Our Orders In HomePage"],
    [dash,"Check Our Design Status On Dashbord Page"],
    [qr,"Generate Qr-codes in Generate-Qr Page"],
    [scan,"Scan our Products in Scan-Qr Page"],
    [activity,"We Check Our Scanning Activity in ActivityPage"],
    [cs,"And Finally We interact with our customers regarding order placement"]
  ];
  return (
    <div>
      <NavBar />
      <div className="flex justify-center flex-col items-center">
        <div className="mt-24 mb-[11rem] text-white flex flex-col justify-center items-center  h-full w-full">
          <h1 className="mt-2  text-4xl w-full text-center font-extrabold  non-italic">
            WELCOME TO PSI LANDING HERE WE
          </h1>
         <BsArrowDownShort className="text-5xl mt-4"/>
          {food.map((el,index)=>{
              return <AnimationCard key={index} image={el[0]}  note={el[1]}/>
          })}    
        </div>
        <div className="flex justify-center p-8">
          {user ? <motion.button className="shadow-md shadow-red-600   w-36 rounded-lg text-red-200 font-semibold bg-red-700 h-10 animate-bounce"
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9 }}
          onClick={logOutUser}
          >
           Log Out
        </motion.button>  :<motion.button className="shadow-md shadow-emerald-600   w-36 rounded-lg text-emerald-400 font-semibold bg-emerald-900 h-10"
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9 }}
          onClick={()=>navigate("/signIn")}
          >
            Sign In
        </motion.button> }
        </div>
      </div>
    </div>
  );
}

const cardVariants= {
    offscreen: {
      y: 300
    },
    onscreen: {
      y: 50,
      rotate: -20,
      transition: {
        type: "spring",
        bounce: 0.6,
        duration: 0.8
      }
    }
  };



const AnimationCard = ({ image,note}) => {
  return (
    <>
      <motion.div
        className="p-8 -mb-24 flex justify-center
         relative"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <motion.div
          variants={cardVariants}
          className="bg-slate-800 shadow-inner w-60 md:w-96
          text-xl flex flex-col justify-center items-center rounded-xl h-[450px] p-8 hover:bg-slate-900"
        >
         <img src={image} alt="workImg" className="md:w-56 w-52 h-52 md:h-56 rounded-lg"/>
         <span className="text-center font-bold">
        <p>{note}</p>
         </span>   
        </motion.div>
      </motion.div>
    </>
  );
};

export default LandingPage;
