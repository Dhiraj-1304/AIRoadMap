import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicOnlyRoute = () => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    return <Navigate to="/generate" replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
