import { Navigate } from "react-router-dom";
import { hasSession, getRole } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  if (!hasSession()) {
    return <Navigate to="/login" replace />;
  }

  const role = getRole()?.toUpperCase();

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    if (role === "CUSTOMER") {
      return <Navigate to="/dashboard/cost-explorer" replace />;
    }
    return <Navigate to="/dashboard/users" replace />;
  }

  return children;
};

export default ProtectedRoute;
