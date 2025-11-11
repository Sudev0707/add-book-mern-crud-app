import React from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const userAuth = localStorage.getItem("userAuth");
  const authUser = JSON.parse(userAuth);

  useEffect(() => {
    if (!authUser?.isLogin) {
      navigate("/login");
    }
  }, []);

  return children;
};

export default ProtectedRoute;
