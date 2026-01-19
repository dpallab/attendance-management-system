import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children, role }) => {
  const token = Cookies.get("token");
  const storedRole = localStorage.getItem("role");

  // If logged in AND role matches → redirect to dashboard
  if (token && storedRole === role) {
    if (role === "admin") return <Navigate to="/admin-dashboard" />;
    if (role === "manager") return <Navigate to="/manager-dashboard" />;
    if (role === "employee") return <Navigate to="/employee-dashboard" />;
  }

  // Otherwise allow access to login page
  return children;
};

export default PrivateRoute;
