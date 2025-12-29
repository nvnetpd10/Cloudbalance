// import { Routes, Route } from "react-router-dom";
// import Login from "../pages/Login/Login";
// import ProtectedRoute from "../routes/ProtectedRoute";
// import MainLayout from "../layouts/MainLayout";

// import Users from "../pages/Users/Users";
// import AddUsers from "../pages/Users/AddUsers";
// import Onboarding from "../pages/Onboarding/Onboarding";
// import CreateIamRole from "../pages/Onboarding/LinkPages/PageOne";
// import CostExplorer from "../pages/CostExplorer/CostExplorer";
// import AwsDashboard from "../pages/AwsDashboard/AwsDashboard";
// import EC2Table from "../pages/AwsDashboard/Tables/EC2Table";
// import NotFound from "../pages/NotFound/NotFound";
// import AddCustomerManagedPolicies from "../pages/Onboarding/LinkPages/PageTwo";
// import CreateCostUsageReport from "../pages/Onboarding/LinkPages/PageThree";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/login" element={<Login />} />

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <MainLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Users />} />

//         <Route path="users" element={<Users />} />
//         <Route path="users/add" element={<AddUsers />} />
//         <Route path="users/edit/:id" element={<AddUsers />} />

//         <Route path="onboarding" element={<Onboarding />} />
//         <Route path="onboarding/create-iam-role" element={<CreateIamRole />} />
//         <Route
//           path="onboarding/customer-managed-policies"
//           element={<AddCustomerManagedPolicies />}
//         />
//         <Route
//           path="onboarding/create-cost"
//           element={<CreateCostUsageReport />}
//         />

//         <Route path="cost-explorer" element={<CostExplorer />} />
//         <Route path="aws-dashboard" element={<AwsDashboard />} />
//         <Route path="aws-dashboard/ec2" element={<EC2Table />} />

//         <Route path="*" element={<NotFound />} />
//       </Route>

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }


// --------------------------------------------------------------------------------------
// import { Routes, Route, Navigate } from "react-router-dom";
// import { getRole } from "../utils/auth"; // Role check karne ke liye import
// import Login from "../pages/Login/Login";
// import ProtectedRoute from "../routes/ProtectedRoute";
// import MainLayout from "../layouts/MainLayout";

// import Users from "../pages/Users/Users";
// import AddUsers from "../pages/Users/AddUsers";
// import Onboarding from "../pages/Onboarding/Onboarding";
// import CreateIamRole from "../pages/Onboarding/LinkPages/PageOne";
// import CostExplorer from "../pages/CostExplorer/CostExplorer";
// import AwsDashboard from "../pages/AwsDashboard/AwsDashboard";
// import EC2Table from "../pages/AwsDashboard/Tables/EC2Table";
// import NotFound from "../pages/NotFound/NotFound";
// import AddCustomerManagedPolicies from "../pages/Onboarding/LinkPages/PageTwo";
// import CreateCostUsageReport from "../pages/Onboarding/LinkPages/PageThree";

// export default function AppRoutes() {
//   const role = getRole(); // LocalStorage se role nikalna

//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/login" element={<Login />} />

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <MainLayout />
//           </ProtectedRoute>
//         }
//       >
//         {/* INDEX ROUTE: Role ke hisaab se default page decide hoga */}
//         <Route 
//           index 
//           element={role === "CUSTOMER" ? <Navigate to="cost-explorer" replace /> : <Users />} 
//         />

//         {/* ADMIN & READONLY ROUTES: Customer ko ye routes nahi dikhenge */}
//         {role !== "CUSTOMER" && (
//           <>
//             <Route path="users" element={<Users />} />
//             <Route path="users/add" element={<AddUsers />} />
//             <Route path="users/edit/:id" element={<AddUsers />} />

//             <Route path="onboarding" element={<Onboarding />} />
//             <Route path="onboarding/create-iam-role" element={<CreateIamRole />} />
//             <Route
//               path="onboarding/customer-managed-policies"
//               element={<AddCustomerManagedPolicies />}
//             />
//             <Route
//               path="onboarding/create-cost"
//               element={<CreateCostUsageReport />}
//             />
//           </>
//         )}

//         {/* SHARED ROUTES: Ye routes sabke liye open hain */}
//         <Route path="cost-explorer" element={<CostExplorer />} />
//         <Route path="aws-dashboard" element={<AwsDashboard />} />
//         <Route path="aws-dashboard/ec2" element={<EC2Table />} />

//         {/* 404 handler inside dashboard */}
//         <Route path="*" element={<NotFound />} />
//       </Route>

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }
// -----------------------------------------------------------


import { Routes, Route, Navigate } from "react-router-dom";
import { getRole } from "../utils/auth";
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
  const rawRole = getRole();
  const role = rawRole ? rawRole.toUpperCase() : ""; // Bulletproof check

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
        {/* Redirect logic: Customer seedha cost-explorer par jayega */}
        <Route 
          index 
          element={role === "CUSTOMER" ? <Navigate to="cost-explorer" replace /> : <Navigate to="users" replace />} 
        />

        {/* Restricted Routes: CUSTOMER ko access nahi milega */}
        {role !== "CUSTOMER" && (
          <>
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
          </>
        )}

        {/* Shared Routes: Everyone can access */}
        <Route path="cost-explorer" element={<CostExplorer />} />
        <Route path="aws-dashboard" element={<AwsDashboard />} />
        <Route path="aws-dashboard/ec2" element={<EC2Table />} />

        {/* Catch-all within dashboard */}
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}