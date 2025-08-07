import React from "react";
import "./css/Header.css";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button className="search-btn">🔍</button>
        </div>
      </div>

      <div className="header-right">
        <div className="notifications">
          <button className="notification-btn">🔔</button>
          <span className="notification-badge">3</span>
        </div>

        <div className="user-profile">
          <div className="user-avatar">👤</div>
          <div className="user-info">
            <p className="user-name">Admin User</p>
            <p className="user-email">admin@karima.com</p>
          </div>
          <button className="dropdown-btn">▼</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
