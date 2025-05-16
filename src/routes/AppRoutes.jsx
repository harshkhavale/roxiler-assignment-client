import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import AuthPage from "../screens/common/Auth";

import { ROLES, hasRole } from "../utils";
import AuthScreen from "../screens/common/Auth";

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

      <Route path="/" element={<AuthScreen />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
