import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/Sidebar.css";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    { id: 1, name: "Tableau de bord", icon: "📊", path: "/" },
    { id: 2, name: "Appartements", icon: "🏠", path: "/apartments" },
    { id: 3, name: "Locataires", icon: "👥", path: "/tenants" },
    { id: 4, name: "Courtiers", icon: "🤝", path: "/courtiers" },
    { id: 5, name: "Locations", icon: "📋", path: "/rentals" },
    { id: 6, name: "Rapports", icon: "📈", path: "/reports" },
    { id: 7, name: "Paramètres", icon: "⚙️", path: "/settings" },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h2>Karima</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={location.pathname === item.path ? "active" : ""}
            >
              <Link to={item.path}>
                <span className="icon">{item.icon}</span>
                <span className="text">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="avatar">👤</div>
          <div className="user-details">
            <p className="name">Admin User</p>
            <p className="role">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
