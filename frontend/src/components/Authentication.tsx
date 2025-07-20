import React, {  useContext } from "react";
import { Navigate,  } from "react-router-dom";
import { AuthContext } from "../authContext/context";

const Authentication = ({children}:{
  children: React.ReactNode;
}) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("Current User:", currentUser);

  if (!currentUser) {
    console.log("under currect user not exist")
    return <Navigate to="/login" replace />;
  }
  console.log("after current user exist")

  return children
};

export default Authentication;
