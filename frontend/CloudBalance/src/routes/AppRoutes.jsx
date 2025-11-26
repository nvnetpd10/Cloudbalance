import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import ProtectedRoute from "../routes/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

import Users from "../pages/Users/Users";
import AddUsers from "../pages/Users/AddUsers";
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
        <Route index element={<Users />} />
        <Route path="users" element={<Users />} />
        <Route path="users/add" element={<AddUsers />} />
        <Route path="users/edit/:id" element={<AddUsers />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="cost-explorer" element={<CostExplorer />} />
        <Route path="aws-dashboard" element={<AwsDashboard />} />
      </Route>
    </Routes>
  );
}
