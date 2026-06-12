import { NavLink } from "react-router-dom";
import { FiZap, FiGrid, FiClock, FiFileText, FiShield } from "react-icons/fi";

function Sidebar() {
  const links = [
    { to: "/dashboard", label: "Dashboard", icon: FiGrid },
    { to: "/history", label: "Interview History", icon: FiClock },
    { to: "/resume", label: "Resume Analyzer", icon: FiFileText },
    { to: "/admin", label: "Admin Panel", icon: FiShield },
  ];

  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" className="sidebar-logo">
        <div className="sidebar-logo-icon"><FiZap /></div>
        <span>InterviewPrep</span>
      </NavLink>

      <ul className="sidebar-nav">
        {links.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `sidebar-link${isActive ? " active" : ""}`
              }
            >
              <Icon />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
