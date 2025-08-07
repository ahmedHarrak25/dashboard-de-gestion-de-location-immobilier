import React, { useState, useEffect } from "react";
import "../css/Apartments.css";
import axios from "axios";

const Apartments = () => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/appartements")
      .then((response) => {
        setApartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching apartments:", error);
      });
  }, []);

  const getStatusColor = (status) => {
    return status === true ? "#ff4757" : "#2ed573";
  };

  const getStatusText = (status) => {
    return status === true ? "Occupé" : "Disponible";
  };

  return (
    <div className="apartments">
      <div className="apartments-header">
        <div className="header-content">
          <h1>Appartements</h1>
        </div>
      </div>
      <div className="apartments-stats">
        <div className="stat-item">
          <span className="stat-number">{apartments.length}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {apartments.filter((a) => a.occupe === false).length}
          </span>
          <span className="stat-label">Disponibles</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {apartments.filter((a) => a.occupe === true).length}
          </span>
          <span className="stat-label">Occupés</span>
        </div>
      </div>
      <div className="apartments-grid">
        {apartments.map((apartment) => (
          <div key={apartment.appt} className="apartment-card">
            <div className="apartment-header">
              <div
                className="apartment-status"
                style={{ backgroundColor: getStatusColor(apartment.occupe) }}
              >
                {getStatusText(apartment.occupe)}
              </div>
            </div>

            <div className="apartment-info">
              <h3 className="apartment-number">
                Appartement{"   "}
                <span style={{ fontSize: "28px", fontWeight: "bold" }}>
                  {apartment.appt}
                </span>
              </h3>
            </div>

            {apartment.status === "occupied" && (
              <div className="tenant-info">
                <div className="tenant-header">
                  <span className="tenant-icon">👤</span>
                  <span className="tenant-label">Locataire actuel</span>
                </div>
                <p className="tenant-name">{apartment.tenant}</p>
                <p className="move-in-date">
                  Depuis le{" "}
                  {new Date(apartment.moveInDate).toLocaleDateString("fr-FR")}
                </p>
              </div>
            )}

            <div className="apartment-actions">
              <button className="action-btn edit-btn">Voir détails</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apartments;
