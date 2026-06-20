import { useState } from "react";
import { registerUser } from "../services/registerService";
import { useNavigate } from "react-router-dom";
function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate =useNavigate();
    const handleRegister =
async () => {

    try {

        const userData = {
            name,
            email,
            password
        };

        const response =
            await registerUser(
                userData
            );

        console.log(response);

        alert(
            "Registration Successful"
        );
        navigate("/login");

    } catch (error) {

        console.log(error);

    }

};
    return (

        <div className="auth-container">
           <div className="auth-card">

            <h1>
                Register Page
            </h1>

            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <br /><br />

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <br /><br />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <br /><br />

            <button
                onClick={handleRegister}
            >
                Register
            </button>

            <p>

                Already have an account?

                <a href="/login">
                    Login
                </a>

            </p>
            </div>
        </div>

    );

}

export default Register;