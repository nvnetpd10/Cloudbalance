// import { Navigate } from "react-router-dom";
// import { hasSession, getRole } from "../utils/auth";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import api from "../utils/axios";
// import { useDispatch } from "react-redux";
// import { setRoles } from "../redux/auth.actions";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fee = async () => {
//       try {
//         const res = await api.get("/auth/authCheck");
//         console.log(res.data); // roles array
//         dispatch(setRoles(res.data));
//         setRoles(res.data);
//       } catch (err) {
//         console.log(err?.response?.status); // 401 etc
//         setRoles([]);
//       }
//     };

//     fee(); // ✅ call it
//   }, []);

//   if (!hasSession()) {
//     return <Navigate to="/login" replace />;
//   }

//   const role = getRole()?.toUpperCase();

//   if (allowedRoles && role && !allowedRoles.includes(role)) {
//     if (role === "CUSTOMER") {
//       return <Navigate to="/dashboard/cost-explorer" replace />;
//     }
//     return <Navigate to="/dashboard/users" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { hasSession, getRole } from "../utils/auth";
import { useEffect } from "react";
import api from "../utils/axios";
import { useDispatch } from "react-redux";
import { setRoles } from "../redux/auth.actions";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fee = async () => {
      try {
        const res = await api.get("/auth/authCheck");
        dispatch(setRoles(res.data || []));
      } catch {
        dispatch(setRoles([]));
      }
    };
    fee();
  }, [dispatch]);

  if (!hasSession()) return <Navigate to="/login" replace />;

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
