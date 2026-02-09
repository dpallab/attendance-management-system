const AdminUser = require('../Models/adminUser.js');
const EmployeeUser = require("../Models/employeeUser");
const ManagerUser = require("../Models/managerUser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.register = async (req, res) => {
    // Registration logic here
    const { name, email, password } = req.body;
    const existingUser = await AdminUser.findOne({ email: email });
    if (existingUser) {
        res.status(400).json({ "message": "Email already exists!!" });
    }
    else {
        try {
            const encryptedPass = await bcrypt.hash(password, 12);
            const user = new AdminUser({ name: name, email: email, password: encryptedPass });
            await user.save();

            res.status(200).json({ "message": "Registration Successfull" });
        } catch (error) {
            res.status(400).json({ "The error is:- ": error });
        }
    }

}

exports.login = async (req, res) => {
    // Login logic here
    const { email, password } = req.body;
    // const image= req.file;

    const existingUser = await AdminUser.findOne({ email: email });
    if (!existingUser) {
        return res.status(400).json({ "message": "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ "message": "Invalid password" });
    }

    // Generate JWT token (you can store this in localStorage/cookie)
    const token = jwt.sign({ name: existingUser.name, image: existingUser.image }, process.env.JWT_SECRET, { expiresIn: '1h' });

   /* const token = jwt.sign(
  {
    id: existingUser._id,
    name: existingUser.name,
    role: "admin"
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);*/

    return res.status(200).json({ "message": "Login successful", token });
}

// new

// 🔹 Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await EmployeeUser.find().select("-password");
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employees" });
  }
};

// 🔹 Get all managers
exports.getAllManagers = async (req, res) => {
  try {
    const managers = await ManagerUser.find().select("-password");
    res.status(200).json(managers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch managers" });
  }
};

// 🔹 Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    await EmployeeUser.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete employee" });
  }
};

// 🔹 Delete manager
exports.deleteManager = async (req, res) => {
  try {
    await ManagerUser.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Manager removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete manager" });
  }
};




