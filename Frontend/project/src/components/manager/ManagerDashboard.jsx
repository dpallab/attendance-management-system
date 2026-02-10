
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../../CSS/ManagerDashboard.css";

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (!token) {
    //   navigate("/manager-login");
    //   return;
    // }
    console.log(token)
    loadAttendance();
  }, [token]);

  const loadAttendance = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:4000/api/all"
      );
      setAttendance(res.data);
    } catch (error) {
      alert("Failed to load attendance data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAttendance = async (id) => {
    if (!window.confirm("Are you sure to delete this attendance?")) return;

    try {
      await axios.delete(
        `http://localhost:4000/api/delete/${id}`
      );
      setAttendance((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      alert("Failed to delete attendance",error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload();
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="manager-container">
      {/* Header */}
      <div className="manager-header">
        <h2>Manager Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Attendance Table */}
      <div className="section">
        <h3>Attendance Records</h3>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Punch In</th>
              <th>Punch Out</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {attendance.length === 0 ? (
              <tr>
                <td colSpan="6">No attendance found</td>
              </tr>
            ) : (
              attendance.map((att) => (
                <tr key={att._id}>
                  <td>{att.name}</td>
                  <td>{att.location}</td>
                  <td>{att.punchIn}</td>
                  <td>{att.punchOut}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteAttendance(att._id)}
                    >
                      Delete
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

export default ManagerDashboard;
