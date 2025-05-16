import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import AuthPage from "../screens/common/Auth";

import { ROLES, hasRole } from "../utils";
import AuthScreen from "../screens/common/Auth";
import PasswordResetForm from "../components/PasswordResetForm";
import DashboardLayout from "../components/Layout";
import UserDashboard from "../screens/user/Dashboard";
import AdminDashboard from "../screens/admin/Dashboard";
import AdminStores from "../screens/admin/Stores";
import AdminUsers from "../screens/admin/Users";
import OwnerDashboard from "../screens/owner/Dashboard";
import OwnerRatings from "../screens/owner/Ratings";

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const role = useSelector((state) => state.auth.role);
  return hasRole(role, allowedRoles) ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <Routes>
      <Route path="/" element={<AuthScreen />} />
      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/dashboard"
        element={
          role === ROLES.ADMIN ? (
            <Navigate to="/dashboard/admin" />
          ) : role === ROLES.OWNER ? (
            <Navigate to="/dashboard/owner" />
          ) : role === ROLES.USER ? (
            <Navigate to="/dashboard/user" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/dashboard/user"
        element={
          <RoleProtectedRoute allowedRoles={[ROLES.USER]}>
            <DashboardLayout />
          </RoleProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />

        <Route path="change-password" element={<PasswordResetForm />} />
      </Route>
      <Route
        path="/dashboard/admin"
        element={
          <RoleProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <DashboardLayout />
          </RoleProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="stores" element={<AdminStores />} />
        <Route path="users" element={<AdminUsers />} />

        <Route path="change-password" element={<PasswordResetForm />} />
      </Route>
      <Route
        path="/dashboard/owner"
        element={
          <RoleProtectedRoute allowedRoles={[ROLES.OWNER]}>
            <DashboardLayout />
          </RoleProtectedRoute>
        }
      >
        <Route index element={<OwnerDashboard />} />
        <Route path="ratings" element={<OwnerRatings />} />
        <Route path="change-password" element={<PasswordResetForm />} />
      </Route>
      <Route path="/" element={<AuthScreen />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
