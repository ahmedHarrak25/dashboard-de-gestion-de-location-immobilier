import React from "react";
import "../css/Dashboard.css";

const Dashboard = () => {
  const stats = [
    {
      id: 1,
      title: "Total Properties",
      value: "24",
      change: "+12%",
      icon: "🏠",
      color: "#4CAF50",
    },
    {
      id: 2,
      title: "Active Rentals",
      value: "18",
      change: "+8%",
      icon: "📋",
      color: "#2196F3",
    },
    {
      id: 3,
      title: "Total Tenants",
      value: "32",
      change: "+15%",
      icon: "👥",
      color: "#FF9800",
    },
    {
      id: 4,
      title: "Monthly Revenue",
      value: "$45,230",
      change: "+23%",
      icon: "💰",
      color: "#9C27B0",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "rental",
      message: "New rental agreement signed for Apartment 3B",
      time: "2 hours ago",
      user: "John Doe",
    },
    {
      id: 2,
      type: "payment",
      message: "Rent payment received from Tenant #12",
      time: "4 hours ago",
      user: "Sarah Smith",
    },
    {
      id: 3,
      type: "maintenance",
      message: "Maintenance request submitted for Unit 5A",
      time: "6 hours ago",
      user: "Mike Johnson",
    },
    {
      id: 4,
      type: "property",
      message: "New property added to the system",
      time: "1 day ago",
      user: "Admin",
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening with your properties today.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="stat-card"
            style={{ borderLeftColor: stat.color }}
          >
            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-change positive">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="chart-section">
          <div className="chart-card">
            <h3>Revenue Overview</h3>
            <div className="chart-placeholder">
              <div className="chart-bar" style={{ height: "60%" }}></div>
              <div className="chart-bar" style={{ height: "80%" }}></div>
              <div className="chart-bar" style={{ height: "45%" }}></div>
              <div className="chart-bar" style={{ height: "90%" }}></div>
              <div className="chart-bar" style={{ height: "70%" }}></div>
              <div className="chart-bar" style={{ height: "85%" }}></div>
            </div>
            <div className="chart-labels">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>

        <div className="activity-section">
          <div className="activity-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === "rental" && "📋"}
                    {activity.type === "payment" && "💰"}
                    {activity.type === "maintenance" && "🔧"}
                    {activity.type === "property" && "🏠"}
                  </div>
                  <div className="activity-content">
                    <p className="activity-message">{activity.message}</p>
                    <div className="activity-meta">
                      <span className="activity-user">{activity.user}</span>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
