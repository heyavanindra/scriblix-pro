import React, {  useContext } from "react";
import { AuthContext } from "../authContext/context";
import {  Navigate } from "react-router-dom";

const Authentication = ({children}:{
  children: React.ReactNode;
}) => {
  
  const {authToken } = useContext(AuthContext);
  return authToken ? children : <Navigate to={'/login'} replace></Navigate>
};

export default Authentication;
