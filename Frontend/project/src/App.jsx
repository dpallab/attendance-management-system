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
import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import AttendanceCounted from "./components/employee/AttendanceCounted.jsx";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<PrivateRoute ><EmployeeLogin /></PrivateRoute>} />
        <Route path="/employee-signup" element={<PrivateRoute><EmployeeSignup /></PrivateRoute>} />
        {/* <Route path="/employee-dashboard" element={<EmployeeDashboard />} /> */}
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/admin-login" element={<PrivateRoute><AdminLogin /></PrivateRoute>} />
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />


        <Route path="/manager-login" element={<PrivateRoute ><ManagerLogin /></PrivateRoute>} />
        {/* <Route path="/manager-dashboard" element={<ManagerDashboard />} /> */}
        <Route
          path="/manager-dashboard"
          element={
            <ProtectedRoute role="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />

      </Routes>



    </BrowserRouter>
  );
}

export default App;
