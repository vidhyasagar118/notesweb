import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate
} from "react-router-dom";
import "./MainNavbar.css";

function MainNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // LocalStorage se latest user read karega
  const loadUser = () => {
    try {
      const savedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (savedUser && token) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("User data read error:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();

    // Same browser ke dusre tab me login/logout
    window.addEventListener("storage", loadUser);

    // Same tab me login/logout
    window.addEventListener("authChanged", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("authChanged", loadUser);
    };
  }, []);

  // Route change hone par bhi user check kar lega
  useEffect(() => {
    loadUser();
  }, [location.pathname]);

  // Mobile menu 10 seconds ke baad close
  useEffect(() => {
    if (!menuOpen) return;

    const timer = setTimeout(() => {
      setMenuOpen(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [menuOpen]);

  const scrollToSection = (id) => {
    setMenuOpen(false);

    if (location.pathname === "/") {
      const section = document.getElementById(id);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      return;
    }

    navigate(`/#${id}`);
  };

  const handleLogin = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  const handleDashboard = () => {
    setMenuOpen(false);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setMenuOpen(false);

    window.dispatchEvent(new Event("authChanged"));

    navigate("/");
  };

  const copyGroupCode = async () => {
    if (!user?.groupCode) return;

    try {
      await navigator.clipboard.writeText(user.groupCode);
      alert("Group code copied");
    } catch {
      alert(`Group Code: ${user.groupCode}`);
    }
  };

  return (
    <nav className="navbar">
      <div
        className="logo"
        onClick={() => scrollToSection("home")}
      >
        <div
          className="menu-toggle"
          onClick={(event) => {
            event.stopPropagation();
            setMenuOpen((previous) => !previous);
          }}
        >
          ☰
        </div>

        📘 <span>NOTES.WEB</span>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li onClick={() => scrollToSection("home")}>
          Home
        </li>

        <li onClick={() => scrollToSection("features")}>
          Features
        </li>

        <li onClick={() => scrollToSection("howitworks")}>
          How It Works
        </li>

        <li onClick={() => scrollToSection("about")}>
          About
        </li>

        <li
          onClick={() => {
            setMenuOpen(false);
            navigate("/contact");
          }}
        >
          Contact
        </li>

        {user && (
          <li
            className="mobile-dashboard-link"
            onClick={handleDashboard}
          >
            Dashboard
          </li>
        )}
      </ul>

      {!user ? (
        <button
          type="button"
          className="nav-btn"
          onClick={handleLogin}
        >
          Login / Get Started
        </button>
      ) : (
        <div className="main-user-info">
          <button
            type="button"
            className="user-name-button"
            onClick={handleDashboard}
            title="Open Dashboard"
          >
            <span className="user-avatar">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </span>

            <span className="user-name-text">
              {user.name}
            </span>
          </button>

          <button
            type="button"
            className="group-code-button"
            onClick={copyGroupCode}
            title="Click to copy group code"
          >
            <span className="group-code-label">
              Group Code
            </span>

            <strong>{user.groupCode}</strong>
          </button>

          <button
            type="button"
            className="main-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default MainNavbar;