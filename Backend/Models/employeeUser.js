const mongoose = require('mongoose');

const employeeUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const employeeUserModel = mongoose.model("EmployeeUser", employeeUserSchema);

module.exports = employeeUserModel;