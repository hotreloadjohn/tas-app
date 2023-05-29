import { Link, Outlet, useNavigate } from "react-router-dom";
import DNavbar from "./DNavbar";
import { useAuthContext } from "../contexts/AuthContext";
import PublicNavbar from "./PublicNavbar";

export default function Layout() {
  const { isAuthenticated, user } = useAuthContext();

  console.log(user);
  return (
    <>
      {/* show diff navbar based on user role / menu setting */}
      {!isAuthenticated && <PublicNavbar />}
      {isAuthenticated && <DNavbar />}

      <Outlet />
    </>
  );
}
