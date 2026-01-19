import { useState, useEffect } from "react";
import "../../CSS/EmployeeDashboard.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";

const EmployeeDashboard = () => {
  const [location, setLocation] = useState("");
  const [punchIn, setPunchIn] = useState(null);
  const [punchOut, setPunchOut] = useState(null);
  const [status, setStatus] = useState("Pending");
  //   const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const verifyToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userName = verifyToken ? verifyToken.name : '';

  const handlePunchIn = () => {
    if (!location) return alert("Please select job location");
    setPunchIn(new Date().toLocaleTimeString());
  };

  const handlePunchOut = () => {
    if (!punchIn) return alert("Punch In first");
    setPunchOut(new Date().toLocaleTimeString());
    setStatus("Waiting for Manager Approval");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
     localStorage.removeItem("role");
      window.location.reload();
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="user-info">
          <div className="avatar">
            {userName?.charAt(0).toUpperCase()}
          </div>
          <h3>Welcome, {userName}</h3>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Dashboard Card */}
      <div className="dashboard-card">
        {/* Job Location */}
        <div className="card-section">
          <h4>Job Location</h4>
          <div className="radio-group">
            {["Work From Home", "Office", "Travelling"].map((loc) => (
              <label key={loc}>
                <input
                  type="radio"
                  name="loc"
                  onChange={() => setLocation(loc)}
                  disabled={!!location}
                />
                {loc}
              </label>
            ))}
          </div>
        </div>

        {/* Punch Buttons */}
        <div className="button-group">
          <button
            className="btn punch-in"
            onClick={handlePunchIn}
            disabled={!!punchIn}
          >
            Punch In
          </button>

          <button
            className="btn punch-out"
            onClick={handlePunchOut}
            disabled={!!punchOut}
          >
            Punch Out
          </button>
        </div>

        <hr />

        {/* Attendance Info */}
        <div className="info-grid">
          <div>
            <span>Punch In</span>
            <p>{punchIn || "--"}</p>
          </div>
          <div>
            <span>Punch Out</span>
            <p>{punchOut || "--"}</p>
          </div>
          <div>
            <span>Location</span>
            <p>{location || "--"}</p>
          </div>
          <div>
            <span>Status</span>
            <p className={`status ${status !== "Pending" ? "waiting" : ""}`}>
              {status}
            </p>
          </div>
          <div>
            <span>Date</span>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
