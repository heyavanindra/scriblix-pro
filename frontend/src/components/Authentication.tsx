import React, {  useContext } from "react";
import { AuthContext } from "../authContext/context";

const Authentication = ({children}:{
  children: React.ReactNode;
}) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("Current User:", currentUser);

 
  console.log("after current user exist")
  return children
};

export default Authentication;
