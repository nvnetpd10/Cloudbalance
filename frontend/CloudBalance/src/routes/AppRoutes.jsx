import { Routes, Route, Navigate } from "react-router-dom";
import { getRole } from "../utils/auth";
import Login from "../pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

import Users from "../pages/Users/Users";
import AddUsers from "../pages/Users/AddUsers";
import Onboarding from "../pages/Onboarding/Onboarding";
import CreateIamRole from "../pages/Onboarding/LinkPages/PageOne";
import CostExplorer from "../pages/CostExplorer/CostExplorer";
import AwsDashboard from "../pages/AwsDashboard/AwsDashboard";
import EC2Table from "../pages/AwsDashboard/Tables/EC2Table";
import NotFound from "../pages/NotFound/NotFound";
import AddCustomerManagedPolicies from "../pages/Onboarding/LinkPages/PageTwo";
import CreateCostUsageReport from "../pages/Onboarding/LinkPages/PageThree";

export default function AppRoutes() {
  const role = getRole()?.toUpperCase();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route path="/404" element={<NotFound />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            role === "CUSTOMER" ? (
              <Navigate to="cost-explorer" replace />
            ) : (
              <Navigate to="users" replace />
            )
          }
        />

        <Route path="cost-explorer" element={<CostExplorer />} />
        <Route path="aws-dashboard" element={<AwsDashboard />} />
        <Route path="aws-dashboard/ec2" element={<EC2Table />} />

        <Route
          path="users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "READONLY"]}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="users/add"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AddUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="users/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AddUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="onboarding"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "READONLY"]}>
              <Onboarding />
            </ProtectedRoute>
          }
        />
        <Route
          path="onboarding/create-iam-role"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CreateIamRole />
            </ProtectedRoute>
          }
        />
        <Route
          path="onboarding/customer-managed-policies"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AddCustomerManagedPolicies />
            </ProtectedRoute>
          }
        />
        <Route
          path="onboarding/create-cost"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CreateCostUsageReport />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
