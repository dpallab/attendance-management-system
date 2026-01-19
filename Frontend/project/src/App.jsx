import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import EmployeeLogin from "./components/employee/EmployeeLogin";
import EmployeeSignup from "./components/employee/EmployeeSignup";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import AdminLogin from "./components/admin/AdminLogin.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import ManagerLogin from "./components/manager/managerLogin.jsx";
import ManagerDashboard from "./components/manager/managerDashboard.jsx";
import PrivateRoute from "./components/PrivateRoute";
import PageNotFound from "./components/PageNotFound.jsx";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<PrivateRoute role="employee"><EmployeeLogin /></PrivateRoute>} />
        <Route path="/employee-signup" element={<PrivateRoute><EmployeeSignup /></PrivateRoute>} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

        <Route path="/admin-login" element={<PrivateRoute role="admin"><AdminLogin /></PrivateRoute>} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="/manager-login" element={<PrivateRoute role="manager"><ManagerLogin /></PrivateRoute>} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>


    </BrowserRouter>
  );
}

export default App;
