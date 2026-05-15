import "./navbar.css"
function Navbar({ user }) {

    return (
        <div className="navbar">

            <h2 className="navhead">
                Student File Manager
            </h2>

            <div className="userinfo">
                <p className="usernameshow">
User: {user?.name}

                </p>

                <p className="groupcodeshow">
Group Code: {user?.groupCode}                </p>
            </div>

        </div>
    )
}

export default Navbar