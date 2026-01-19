const ManagerUser = require('../Models/managerUser.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.register = async (req, res) => {
    // Registration logic here
    const { name, email, password } = req.body;
    const existingUser = await ManagerUser.findOne({ email: email });
    if (existingUser) {
        res.status(400).json({ "message": "Email already exists!!" });
    }
    else {
        try {
            const encryptedPass = await bcrypt.hash(password, 12);
            const user = new ManagerUser({ name: name, email: email, password: encryptedPass });
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

    const existingUser = await ManagerUser.findOne({ email: email });
    if (!existingUser) {
        return res.status(400).json({ "message": "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ "message": "Invalid password" });
    }

    // Generate JWT token (you can store this in localStorage/cookie)
    const token = jwt.sign({ name: existingUser.name, image: existingUser.image }, process.env.JWT_SECRET, { expiresIn: '1h' });
 /*   const token = jwt.sign(
  {
    id: existingUser._id,
    name: existingUser.name,
    role: "manager"
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);*/

    return res.status(200).json({ "message": "Login successful", token });
}