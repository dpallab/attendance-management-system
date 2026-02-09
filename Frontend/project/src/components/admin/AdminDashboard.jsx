// import React from 'react'
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {

//     const navigate = useNavigate();
//     const token = Cookies.get("token");

//     const handleLogout = () => {
//         console.log(token);
//         Cookies.remove("token");
//         navigate("/admin-login");
//         localStorage.removeItem("role");
//          window.location.reload();
//     };
//     return (
//         <div className="div">
//             <div>welcome to Admin Dashboard</div>
//             <button className="logout-btn" onClick={handleLogout}>
//                 Logout
//             </button>
//         </div>

//     )
// }

// export default AdminDashboard
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../../CSS/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (!token) {
    //   navigate("/admin-login");
    //   return;
    // }

    console.log(token);
    loadData();
  }, [token, navigate]);


  const loadData = async () => {
    try {
      setLoading(true);
      const [empRes, mgrRes] = await Promise.all([
        axios.get("http://localhost:4000/api/all-employees"),
        axios.get("http://localhost:4000/api/all-managers"),
      ]);
      // console.log(loadData())
      setEmployees(empRes.data);
      setManagers(mgrRes.data);
    } catch (error) {
      alert("Failed to load data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
//  loadData();
  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure to remove this employee?")) return;

    try {
      await axios.delete(
        `http://localhost:4000/api/delete-employee/${id}`
      );
      setEmployees((prev) => prev.filter((e) => e._id !== id));
    } catch (error) {
      alert("Failed to delete employee",error);
    }
  };

  const deleteManager = async (id) => {
    if (!window.confirm("Are you sure to remove this manager?")) return;

    try {
      await axios.delete(
        `http://localhost:4000/api/delete-manager/${id}`
      );
      setManagers((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      alert("Failed to delete manager", error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("role");
    navigate("/admin-login");
    window.location.reload();
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="admin-container">
      {/* Header */}
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Employees */}
      <div className="section">
        <h3>Employees</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="3">No employees found</td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteEmployee(emp._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Managers */}
      <div className="section">
        <h3>Managers</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {managers.length === 0 ? (
              <tr>
                <td colSpan="3">No managers found</td>
              </tr>
            ) : (
              managers.map((mgr) => (
                <tr key={mgr._id}>
                  <td>{mgr.name}</td>
                  <td>{mgr.email}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteManager(mgr._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;



