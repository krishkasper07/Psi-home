import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../authContext/authProvider";
import NavBar from "../navbar/navbar";


export default function ProtectedRoutes() {
  const { user, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <>loading..</>;
  }
  return user ? (
    <div className="relative top-0">
     <NavBar/>
      <Outlet />
    </div>
  ) : (
    <>
      <Navigate to={"/"}/>
    </>
  );
}
