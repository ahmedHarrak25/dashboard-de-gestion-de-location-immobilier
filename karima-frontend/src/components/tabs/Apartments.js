import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Apartments.css";
import axios from "axios";

const Apartments = () => {
  const navigate = useNavigate();
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

  const getCurrentLocation = (apartement) => {
    if (!apartement.locations || apartement.locations.length === 0) {
      return null;
    }

    return (
      apartement.locations.find((location) => {
        const today = new Date();
        const dateEntree = new Date(location.dateEntree);
        const dateSortie = new Date(location.dateSortie);
        return today >= dateEntree && today <= dateSortie;
      }) || null
    );
  };

  const getExitDay = (apartment) => {
    const currentLocation = getCurrentLocation(apartment);
    if (!currentLocation) return null;

    return new Date(currentLocation.dateSortie).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getLocataire = (apartement) => {
    const currentLocation = getCurrentLocation(apartement);
    return currentLocation?.locataire || null;
  };

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

            {apartment.occupe === true && (
              <div className="tenant-info">
                {getLocataire(apartment) ? (
                  <>
                    <p className="tenant-name">
                      Locataire actuel: {getLocataire(apartment).nom}
                    </p>
                    <p className="move-in-date">
                      Sortira le {getExitDay(apartment)}
                    </p>
                  </>
                ) : (
                  <p className="move-in-date">
                    Données locataire non disponibles
                  </p>
                )}
              </div>
            )}
            {apartment.occupe === false && (
              <div className="tenant-info">
                <p className="move-in-date">Aucune Location actuelle</p>
              </div>
            )}
            <div className="apartment-actions">
              <button
                className="action-btn edit-btn"
                onClick={() => {
                  console.log("Apartment object:", apartment);
                  console.log("id ", apartment.id);
                  navigate(
                    "/view-apartment/" +
                      (apartment.id || apartment._id || apartment.appt)
                  );
                }}
              >
                Voir détails
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apartments;
