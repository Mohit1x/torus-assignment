import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/store";

const ProtectedRoute: React.FC = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
