import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/notes" replace />;
  }

  return children;
};

export default PublicRoute;
