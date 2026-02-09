// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, role }) => {
  const token = Cookies.get("token");
  const storedRole = localStorage.getItem("role");

  // Not Login → login page
  if (!token) {
    return <Navigate to={`/${role}-login`} replace />;
  }

  // Wrong role → own dashboard
  if (storedRole !== role) {
    return <Navigate to={`/${storedRole}-dashboard`} replace />;
  }

  //  OK
  return children;
};

export default ProtectedRoute;
