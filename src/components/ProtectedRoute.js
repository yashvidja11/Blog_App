import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const login = useSelector((state) => state.signInData.login);
  console.log(login);
  return <div>{!!login ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default ProtectedRoute;
