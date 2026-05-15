import "./navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({ user }) {

    const navigate = useNavigate();

    const logout = () => {
sessionStorage.removeItem("token");
sessionStorage.removeItem("user");

        navigate("/");
    };

    return (

        <div className="navbar">

            <h2 className="navhead">
                NOTES.COM
            </h2>

            <div className="userinfo">

                <p className="usernameshow">
                    User: {user?.name}
                </p>

                <p className="groupcodeshow">
                    Group Code: {user?.groupCode}
                </p>

                <button onClick={logout}>
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Navbar;