const mongoose = require('mongoose');

const managerUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const managerUserModel = mongoose.model("ManagerUser", managerUserSchema);

module.exports = managerUserModel;