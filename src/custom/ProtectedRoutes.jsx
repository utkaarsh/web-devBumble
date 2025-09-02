import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../auth/context";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // renders child routes if user exists
};

export default ProtectedRoute;
