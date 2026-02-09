# 🕒 Attendance Management System (MERN Stack)

A **role-based Attendance Management System** built using the **MERN Stack** where  
**Employees punch attendance**, **Managers verify work status**, and **Admins control the system**.

---

## 🚀 Features

### 👨‍💼 Employee
- Register & Login
- Punch In / Punch Out
- Select Job Location (WFH / Office / Travelling)
- View daily attendance status
- Logout securely

### 🧑‍💻 Manager
- Login
- View all employee attendance data
- Calculate working hours
- Mark attendance as:
  - Full Day
  - Half Day
  - Not Working
- Update employee status in real time

### 👑 Admin
- Login
- View all Employees & Managers
- Remove (Delete) Employee or Manager
- Full system control

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Axios
- CSS (Custom UI)
- js-cookie

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- CORS

---

## 🔐 Authentication & Authorization

- JWT based authentication
- Role-based access control:
  - Employee
  - Manager
  - Admin
- Cookies used for token storage
- Protected Routes (Private Routes)
- Navbar auto-disables based on logged-in role
