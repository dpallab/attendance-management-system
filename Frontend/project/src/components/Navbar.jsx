import { NavLink } from "react-router-dom";
import "../CSS/Navbar.css";

const Navbar = () => {
  const role = localStorage.getItem("role");

  const isDisabled = (linkRole) => {
    console.log("Checking disable for:", linkRole, "with role:", role);
    return role && role !== linkRole;
  };

  return (
    <nav className="navbar">
      <div className="logo">CompanyPortal</div>

      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={`nav-link ${isDisabled("employee") ? "disabled" : ""}`}
          onClick={(e) => isDisabled("employee") && e.preventDefault()}
        >
          Employee
        </NavLink>

        <NavLink
          to="/manager-login"
          className={`nav-link ${isDisabled("manager") ? "disabled" : ""}`}
          onClick={(e) => isDisabled("manager") && e.preventDefault()}
        >
          Manager
        </NavLink>

        <NavLink
          to="/admin-login"
          className={`nav-link ${isDisabled("admin") ? "disabled" : ""}`}
          onClick={(e) => isDisabled("admin") && e.preventDefault()}
        >
          Admin
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
