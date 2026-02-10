
import { useState, useEffect } from "react";
import axios from "axios";
import "../../CSS/EmployeeDashboard.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const verifyToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userName = verifyToken ? verifyToken.name : "";

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [punchIn, setPunchIn] = useState("");
  const [punchOut, setPunchOut] = useState("");
  const [isSubmittedToday, setIsSubmittedToday] = useState(false);

  //  Check submit status on load
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const savedDate = localStorage.getItem("attendanceSubmittedDate");

    if (savedDate === today) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSubmittedToday(true);
    } else {
      // new day reset
      localStorage.removeItem("attendanceSubmittedDate");
      setIsSubmittedToday(false);
      setName("");
      setLocation("");
      setPunchIn("");
      setPunchOut("");
    }
  }, []);

  const handlePunchIn = () => {
    if (!location) return alert("Please select job location");
    setPunchIn(new Date().toLocaleTimeString());
  };

  const handlePunchOut = () => {
    if (!punchIn) return alert("Punch In first");
    setPunchOut(new Date().toLocaleTimeString());
  };

  const handleSubmit = async () => {
    if (!name || !location || !punchIn || !punchOut) {
      return alert("All fields are required");
    }

    try {
      await axios.post("http://localhost:4000/api/submit", {
        name,
        location,
        punchIn,
        punchOut,
      });

      const today = new Date().toLocaleDateString();
      localStorage.setItem("attendanceSubmittedDate", today);
      setIsSubmittedToday(true);

      alert("Attendance submitted successfully ✅");
    } catch (err) {
      alert(err.response?.data?.message || "Server error");
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("role");
    localStorage.removeItem("attendanceSubmittedDate");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="user-info">
          <div className="avatar">{userName?.charAt(0)}</div>
          <h3>Welcome, {userName}</h3>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Card */}
      <div className="dashboard-card">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          disabled={isSubmittedToday}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Location */}
        <div className="radio-group">
          {["Work From Home", "Office", "Travelling"].map((loc) => (
            <label key={loc}>
              <input
                type="radio"
                name="location"
                disabled={isSubmittedToday}
                onChange={() => setLocation(loc)}
              />
              {loc}
            </label>
          ))}
        </div>

        {/* Punch buttons */}
        <div className="button-group">
          <button
            className="btn punch-in"
            onClick={handlePunchIn}
            disabled={!!punchIn || isSubmittedToday}
          >
            Punch In
          </button>

          <button
            className="btn punch-out"
            onClick={handlePunchOut}
            disabled={!punchIn || !!punchOut || isSubmittedToday}
          >
            Punch Out
          </button>
        </div>

        {/* Info */}
        <div className="info">
          <p>Punch In: {punchIn || "--"}</p>
          <p>Punch Out: {punchOut || "--"}</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Submit */}
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={isSubmittedToday}
        >
          {isSubmittedToday ? "Submitted Today ✅" : "Submit Attendance"}
        </button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
