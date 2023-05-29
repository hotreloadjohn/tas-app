import * as React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AssignedModulesPage from "./pages/AssignedModulesPage";
import ModuleCoordinatorListPage from "./pages/ModuleCoordinatorListPage";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route path="/" element={<LoginPage />} /> */}
          <Route index path="/login" element={<LoginPage />} />
          <Route
            path="/landing"
            element={
              <RequireAuth>
                <LandingPage />
              </RequireAuth>
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/view-assigned-module"
            element={
              <RequireAuth>
                <AssignedModulesPage />
              </RequireAuth>
            }
          />
          <Route
            path="/mc-list"
            element={
              <RequireAuth>
                <ModuleCoordinatorListPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function RequireAuth({ children }) {
  let auth = useAuthContext();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
