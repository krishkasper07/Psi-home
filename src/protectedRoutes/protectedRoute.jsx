import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../authContext/authProvider";
import NavBar from "../navbar/navbar";

export default function ProtectedRoutes() {
  const { user, isLoading } = useContext(AuthContext);
  console.log(user);
  if (isLoading) {
    return <>loading..</>;
  }
  return user ? (
    <div>
      <NavBar />
      <Outlet />
    </div>
  ) : (
    <>
      <Navigate to={"/"}/>
    </>
  );
}
