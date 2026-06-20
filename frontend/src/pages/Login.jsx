import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const navigate =
        useNavigate();

    const handleLogin =
        async () => {

            try {

                const response =
                    await loginUser({
                        email,
                        password
                    });

                localStorage.setItem(
                    "token",
                    response.token
                );

                navigate("/dashboard");

            } catch (error) {

                console.log(error);

            }

        };

    return (
        <div className="auth-container">
           <div className="auth-card">

            <h1>Login Page</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <br /><br />

            <button
                onClick={handleLogin}
            >
                Login
            </button>

            <p>

                Don't have an account?

                <a href="/register">
                    Register
                </a>

            </p>
            </div>
        </div>
    );

}

export default Login;