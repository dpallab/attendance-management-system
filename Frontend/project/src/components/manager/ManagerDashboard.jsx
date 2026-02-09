import React, { } from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';


const ManagerDashboard = () => {
const navigate = useNavigate();
  const token = Cookies.get("token");

    // useEffect(() => {
    //   if (!token) {
    //     navigate("/manager-login");
    //   }
    // }, [token, navigate]);
    console.log(token)

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
     localStorage.removeItem("role");
      window.location.reload();
  };
  return (
    <div>
 <div>managerDashboard</div>
 <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
    </div>

  )
}

export default ManagerDashboard