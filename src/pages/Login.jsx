import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./Login.css"
function Login() {

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);

    const [form, setForm] = useState({
        name: "",
        password: ""
    });

    const handleSubmit = async () => {

        try {

            if (isLogin) {

                const res = await API.post("/auth/login", form);

                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                navigate("/dashboard");

            } else {

                await API.post("/auth/register", form);

                alert("Account Created");

                setIsLogin(true);
            }

        } catch (err) {
            alert(err.response.data.message);
        }
    }

    return (
        <>
<h1 className="mainlogo">
    notes.com
</h1>
        <div className="login-box">
            <h2>{isLogin ? "Login" : "Create Account"}</h2>

            <input
            className="logininame"
                placeholder="Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
            className="loginpassword"
                type="password"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button className="loginbtn" onClick={handleSubmit}>
                {isLogin ? "Login" : "Register"}
            </button>

            <p>
                {
                    isLogin
                    ? "No account?"
                    : "Already have account?"
                }
            </p>

            <button className="createbtn" onClick={() => setIsLogin(!isLogin)}>
                {
                    isLogin
                    ? "Create Account"
                    : "Login"
                }
            </button>
        </div>
        </>
    )
}

export default Login