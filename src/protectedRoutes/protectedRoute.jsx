import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../authContext/authProvider';

export default function ProtectedRoutes() {
  const {user,isLoading}=useContext(AuthContext)
   console.log(user)
  if(isLoading){
    return <>
    loading..
    </>
  }
return user ?  (
    <div>
    <Outlet/>
    </div>
  ):(<>
  <Navigate to={'/'} />
  </>)
}
