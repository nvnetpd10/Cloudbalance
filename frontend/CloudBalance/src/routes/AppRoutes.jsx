import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import ProtectedRoute from "../routes/ProtectedRoute";
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
        <Route path="onboarding/create-iam-role" element={<CreateIamRole />} />
        <Route
          path="onboarding/customer-managed-policies"
          element={<AddCustomerManagedPolicies />}
        />
        <Route
          path="onboarding/create-cost"
          element={<CreateCostUsageReport />}
        />

        <Route path="cost-explorer" element={<CostExplorer />} />
        <Route path="aws-dashboard" element={<AwsDashboard />} />
        <Route path="aws-dashboard/ec2" element={<EC2Table />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
