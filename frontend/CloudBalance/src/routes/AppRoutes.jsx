import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import ProtectedRoute from "../routes/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

// pages
import Users from "../pages/Users/Users";
import AddUsers from "../pages/Users/AddUsers"; // <-- NEW
import Onboarding from "../pages/Onboarding/Onboarding";
import CostExplorer from "../pages/CostExplorer/CostExplorer";
import AwsDashboard from "../pages/AwsDashboard/AwsDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* DEFAULT */}
        <Route index element={<Users />} />
        {/* USERS */}
        <Route path="users" element={<Users />} />
        <Route path="/dashboard/users/add" element={<AddUsers />} />{" "}
        {/* <--- NEW ROUTE */}
        {/* OTHERS */}
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="cost-explorer" element={<CostExplorer />} />
        <Route path="aws-dashboard" element={<AwsDashboard />} />
      </Route>
    </Routes>
  );
}
