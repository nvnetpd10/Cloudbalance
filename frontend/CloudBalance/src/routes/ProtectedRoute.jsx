import { Navigate } from "react-router-dom";
import { isLoggedIn, getRole } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  const role = getRole()?.toUpperCase();

  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === "CUSTOMER") {
      return <Navigate to="/dashboard/cost-explorer" replace />;
    }
    return <Navigate to="/dashboard/users" replace />;
  }

  return children;
};

export default ProtectedRoute;
