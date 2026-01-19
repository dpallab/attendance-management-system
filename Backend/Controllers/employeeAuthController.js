const EmployeeUser= require('../Models/employeeUser.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const multer= require('multer');
const dotenv= require('dotenv');
// const employeeUserModel = require('../Models/employeeUser.js');
dotenv.config();


exports .register = async (req, res) => {
    // Registration logic here
    const { name, email, password } = req.body;
    const existingUser = await EmployeeUser.findOne({ email: email });
    if (existingUser) {
        res.status(400).json({ "message": "Email already exists!!" });
    }
    else {
        try {
            const encryptedPass = await bcrypt.hash(password, 12);
            const user = new EmployeeUser({ name: name, email: email, password: encryptedPass  });
            await user.save();

            res.status(200).json({ "message": "Registration Successfull" });
        } catch (error) {
            res.status(400).json({ "The error is:- ": error });
        }
    }

}

exports .login = async (req, res) => {
    // Login logic here
    const { email, password } = req.body;
    // const image= req.file;

        const existingUser = await EmployeeUser.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({ "message": "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ "message": "Invalid password" });
        }

        // Generate JWT token (you can store this in localStorage/cookie)
        const token = jwt.sign({name:existingUser.name, image: existingUser.image }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
 /*       const token = jwt.sign(
  {
    id: existingUser._id,
    name: existingUser.name,
    role: "employee"
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);*/

        return res.status(200).json({ "message": "Login successful",token });
}