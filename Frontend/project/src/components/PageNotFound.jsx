// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <h1 style={{ fontSize: "60px", color: "#3b82f6" }}>404</h1>
      <p style={{ fontSize: "18px" }}>Oops! Page Not Found 😢</p>
      <Link to="/" style={{ color: "#3b82f6", marginTop: "10px" }}>
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
