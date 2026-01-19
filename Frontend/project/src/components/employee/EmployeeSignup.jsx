import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../CSS/EmployeeSignup.css";
import axios from "axios";

const EmployeeSignup = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)

        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = {
            "name": data.name,
            "email": data.email,
            "password": data.password

        }
        console.log(formData)
        axios.post('http://localhost:4000/api/employeeRegister', formData).then((res) => {
            console.log(res)
            alert("Registration Successfull")
            navigate('/');

        }).catch((error) => {
            console.log("The registration error is:- ", error)
            alert("Registration Failed")
        })
    }


return (
    <div className="signup-container">
        <div className="signup-card">
            <h2 className="signup-title">Employee Signup</h2>
            <p className="signup-subtitle">Create your employee account</p>

            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    placeholder="Email address"
                    name="email"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    required
                />

                <button type="submit">Create Account</button>
            </form>

            <p className="signup-footer">
                Already have an account?{" "}
                <Link to="/">Login</Link>
            </p>
        </div>
    </div>
);
};

export default EmployeeSignup;
