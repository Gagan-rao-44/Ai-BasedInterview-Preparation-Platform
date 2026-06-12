import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FiZap } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="navbar-brand-icon"><FiZap /></div>
        InterviewPrep AI
      </Link>

      <div className="nav-links">
        {!user ? (
          <>
            <Link to="/login" className="nav-link">Sign In</Link>
            <Link to="/register" className="nav-link nav-link-primary">Get Started</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/history" className="nav-link">History</Link>
            <button onClick={logoutHandler} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
