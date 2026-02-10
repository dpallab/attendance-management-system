import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../CSS/AdminLogin.css";
import Cookies from "js-cookie";
import axios from "axios";

const AdminLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/api/adminLogin",
        formData
      );

      if (res.status === 200) {
        //  Store JWT token
        Cookies.set("token", res.data.token);

        //  Store role in localStorage

        localStorage.setItem("role", "admin");

        alert(res.data.message);
        navigate("/admin-dashboard");
        window.location.reload();

      }
    } catch (error) {
      console.log("The Login error is:- ", error);
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Admin Login</h2>
        <p className="login-subtitle">Welcome back! Please login</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
