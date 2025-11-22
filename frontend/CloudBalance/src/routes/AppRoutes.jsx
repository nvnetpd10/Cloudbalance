import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import ProtectedRoute from "../routes/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

// pages
import Users from "../pages/Users/Users";
import Onboarding from "../pages/Onboarding/Onboarding";
import CostExplorer from "../pages/CostExplorer/CostExplorer";
import AwsDashboard from "../pages/AwsDashboard/AwsDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard Layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* DEFAULT ROUTE → When entering /dashboard */}
        <Route index element={<Users />} />

        {/* SUB-PAGES */}
        <Route path="users" element={<Users />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="cost-explorer" element={<CostExplorer />} />
        <Route path="aws-dashboard" element={<AwsDashboard />} />
      </Route>
    </Routes>
  );
}
