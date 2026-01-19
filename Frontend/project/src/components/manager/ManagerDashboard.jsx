import React from 'react'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ManagerDashboard = () => {

    const navigate = useNavigate();
    const token = Cookies.get("token");

    const handleLogout = () => {
        console.log(token);
        Cookies.remove("token");
        navigate("/manager-login");
         localStorage.removeItem("role");
          window.location.reload();
    };
    return (
        <div className="div">
            <div>welcome to Manager Dashboard</div>
            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </div>

    )
}

export default ManagerDashboard;