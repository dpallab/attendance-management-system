const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const employeeRoutes = require('./Routes/employeeRoutes.js');
const managerRoutes = require('./Routes/managerRoutes.js');
const adminRoutes = require('./Routes/adminRoutes.js');
const dotenv= require('dotenv');
dotenv.config();
// const cookieParser= require('cookie-parser');

mongoose.connect('mongodb+srv://pallabdas1507_db_user:1234@cluster0.aeb8181.mongodb.net/Attendance').then(() => {
    console.log("MongoDB Connected!!!");
}).catch((error) => {
    console.log("MongoDB connection error is:- ", error);
})

const app = express();
app.use(express.json());
app.use(cors());
// app.use(cookieParser());
// app.use('/uploads', express.static('uploads'));


// initial Routes
app.use('/api', employeeRoutes);
app.use('/api', managerRoutes);
app.use('/api', adminRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("----Server Running on Port Number:", port,"----");
})