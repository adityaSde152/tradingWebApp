import React from "react";
import useAuth from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useAuth();
  if (!user) <Navigate to={"/login"} />;
  return <Outlet />;
};

export default PrivateRoute;
