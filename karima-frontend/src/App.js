import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/tabs/Dashboard";
import Apartments from "./components/tabs/Apartments";
import Locations from "./components/tabs/Locations";
import Tenants from "./components/tabs/Tenants";
import AddTenant from "./components/AddTenant";
import ModifyTenant from "./components/ModifyTenant";
import Courtiers from "./components/tabs/Courtiers";
import AddCourtier from "./components/AddCourtier";
import ModifyCourtier from "./components/ModifyCourtier";
import AddLocation from "./components/AddLocation";
import ViewApartments from "./components/ViewApartment";
import ViewLocataire from "./components/ViewLocataire";
import ViewCourtier from "./components/ViewCourtier";

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app">
      <Sidebar isOpen={sidebarOpen} />
      <div
        className={`main-content ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <Header toggleSidebar={toggleSidebar} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/rentals" element={<Locations />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/courtiers" element={<Courtiers />} />
          <Route path="/add-tenant" element={<AddTenant />} />
          <Route path="/add-courtier" element={<AddCourtier />} />
          <Route path="/modify-tenant/:id" element={<ModifyTenant />} />
          <Route path="/view-locataire/:id" element={<ViewLocataire />} />
          <Route path="/view-courtier/:id" element={<ViewCourtier />} />
          <Route path="/modify-courtier/:id" element={<ModifyCourtier />} />
          <Route path="/add-location/" element={<AddLocation />} />
          <Route path="/view-apartment/:id" element={<ViewApartments />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
