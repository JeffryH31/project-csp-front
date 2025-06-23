import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && allowedRoles.includes(user.role)) {
    return <Outlet />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    const redirectTo = user.role === "admin" ? "/admin/dashboard" : "/";
    return <Navigate to={redirectTo} replace />;
  }

  return null;
};

export default ProtectedRoute;
