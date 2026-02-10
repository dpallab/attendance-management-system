// import { useState} from "react";
// import "../../CSS/EmployeeDashboard.css";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// // import jwtDecode from "jwt-decode";

// const EmployeeDashboard = () => {
//   const [location, setLocation] = useState("");
//   const [punchIn, setPunchIn] = useState(null);
//   const [punchOut, setPunchOut] = useState(null);
//   const [status, setStatus] = useState("Pending");
//   //   const [userName, setUserName] = useState("");

//   const navigate = useNavigate();
//   const token = Cookies.get("token");

//   // useEffect(() => {
//   //   if (!token) {
//   //     navigate("/");
//   //   }
//   // }, [token, navigate]);

//   const verifyToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
//   const userName = verifyToken ? verifyToken.name : '';

//   const handlePunchIn = () => {
//     if (!location) return alert("Please select job location");
//     setPunchIn(new Date().toLocaleTimeString());
//   };

//   const handlePunchOut = () => {
//     if (!punchIn) return alert("Punch In first");
//     setPunchOut(new Date().toLocaleTimeString());
//     setStatus("Waiting for Manager Approval");
//   };

//   const handleLogout = () => {
//     Cookies.remove("token");
//     navigate("/");
//      localStorage.removeItem("role");
//       window.location.reload();
//   };

//   return (
//     <div className="dashboard-page">
//       {/* Header */}
//       <header className="dashboard-header">
//         <div className="user-info">
//           <div className="avatar">
//             {userName?.charAt(0).toUpperCase()}
//           </div>
//           <h3>Welcome, {userName}</h3>
//         </div>

//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//       </header>

//       {/* Dashboard Card */}
//       <div className="dashboard-card">
//         {/* Job Location */}
//         <div className="card-section">
//           <h4>Job Location</h4>
//           <div className="radio-group">
//             {["Work From Home", "Office", "Travelling"].map((loc) => (
//               <label key={loc}>
//                 <input
//                   type="radio"
//                   name="loc"
//                   onChange={() => setLocation(loc)}
//                   disabled={!!location}
//                 />
//                 {loc}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Punch Buttons */}
//         <div className="button-group">
//           <button
//             className="btn punch-in"
//             onClick={handlePunchIn}
//             disabled={!!punchIn}
//           >
//             Punch In
//           </button>

//           <button
//             className="btn punch-out"
//             onClick={handlePunchOut}
//             disabled={!!punchOut}
//           >
//             Punch Out
//           </button>
//         </div>

//         <hr />

//         {/* Attendance Info */}
//         <div className="info-grid">
//           <div>
//             <span>Punch In</span>
//             <p>{punchIn || "--"}</p>
//           </div>
//           <div>
//             <span>Punch Out</span>
//             <p>{punchOut || "--"}</p>
//           </div>
//           <div>
//             <span>Location</span>
//             <p>{location || "--"}</p>
//           </div>
//           <div>
//             <span>Status</span>
//             <p className={`status ${status !== "Pending" ? "waiting" : ""}`}>
//               {status}
//             </p>
//           </div>
//           <div>
//             <span>Date</span>
//             <p>{new Date().toLocaleDateString()}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;


import { useState } from "react";
import axios from "axios";
import "../../CSS/EmployeeDashboard.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const token = Cookies.get("token");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [punchIn, setPunchIn] = useState("");
  const [punchOut, setPunchOut] = useState("");

  const verifyToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
   const userName = verifyToken ? verifyToken.name : '';
  const navigate = useNavigate();

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
      await axios.post(
        "http://localhost:4000/api/submit",
        {
          name,
          location,
          punchIn,
          punchOut,
        }
      );

      alert("Attendance saved successfully ");
      navigate("/attendance")
    } catch (err) {
      alert(err.response?.data?.message || "Server error");
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
    localStorage.removeItem("role");
    window.location.reload();
  };

  return (
    <div className="dashboard-page">
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

      <div className="dashboard-card">
        {/* Name */}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Job Location */}
        <div className="radio-group">
          {["Work From Home", "Office", "Travelling"].map((loc) => (
            <label key={loc}>
              <input
                type="radio"
                name="loc"
                onChange={() => setLocation(loc)}
              />
              {loc}
            </label>
          ))}
        </div>

        {/* Punch Buttons */}
        <button onClick={handlePunchIn} disabled={!!punchIn}>
          Punch In
        </button>

        <button onClick={handlePunchOut} disabled={!!punchOut}>
          Punch Out
        </button>

        {/* Info */}
        <p>Punch In: {punchIn || "--"}</p>
        <p>Punch Out: {punchOut || "--"}</p>

        {/* Submit */}
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
