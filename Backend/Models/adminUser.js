const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const adminUserModel = mongoose.model("AdminUser", adminUserSchema);

module.exports = adminUserModel;

