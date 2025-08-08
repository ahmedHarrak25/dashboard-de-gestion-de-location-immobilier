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

  const getCurrentLocation = (apartement) => {
    return apartement.locations.find((location) => {
      const today = new Date();
      // console.log(location);
      const dateEntree = new Date(location.dateEntree);
      const dateSortie = new Date(location.dateSortie);
      if (today >= dateEntree && today <= dateSortie) {
        return location;
      }
    });
  };

  const getExitDay = (apartment) => {
    const currentLocation = getCurrentLocation(apartment);
    return new Date(currentLocation.dateSortie).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getLocataire = (apartement) => {
    const currentLocation = getCurrentLocation(apartement);
    console.log(currentLocation);
    return currentLocation.locataire;
  };

  //   const currentLocation = apartment.locations.find((location) => {
  //     const today = new Date();
  //     console.log(location);
  //     const dateEntree = new Date(location.dateEntree);
  //     const dateSortie = new Date(location.dateSortie);
  //     return today >= dateEntree && today <= dateSortie;
  //   });
  //   return currentLocation
  //     ? new Date(currentLocation.dateSortie).toLocaleDateString("fr-FR", {
  //         day: "2-digit",
  //         month: "2-digit",
  //         year: "numeric",
  //       })
  //     : null;
  // };

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
                {/* <div className="tenant-header">
                  <span className="tenant-icon">👤</span>
                  <span className="tenant-label">Locataire actuel</span>
                </div> */}
                <p className="tenant-name">
                  Locataire actuel: {getLocataire(apartment).nom}
                </p>
                <p className="move-in-date">
                  Sortira le{" "}
                  {new Date(getExitDay(apartment)).toLocaleDateString("fr-FR")}
                </p>
              </div>
            )}
            {apartment.occupe === false && (
              <div className="tenant-info">
                <p className="move-in-date">Aucune Location actuelle</p>
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
