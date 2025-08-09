import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/Tenants.css";
import axios from "axios";

const ViewApartments = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/appartements/${id}`)
      .then((response) => {
        setLocations(response.data.locations);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Locations:", error);
        setLoading(false);
      });
  }, []);

  const filteredLocations = locations.filter((location) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      location.locataire.nom?.toLowerCase().includes(searchLower) ||
      location.locataire.prenom?.toLowerCase().includes(searchLower) ||
      location.locataire.numTel?.includes(searchTerm) ||
      location.locataire.ville?.toLowerCase().includes(searchLower) ||
      location.courtier.nom?.toLowerCase().includes(searchLower) ||
      location.courtier.prenom?.toLowerCase().includes(searchLower) ||
      location.courtier.numTel?.includes(searchTerm)
    );
  });

  if (loading) {
    return (
      <div className="tenants">
        <div className="tenants-header">
          <h1>Locations</h1>
        </div>
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Chargement des locations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tenants">
      <div className="tenants-header">
        <div className="header-content">
          <h1>Locations</h1>
          <p>Gestion des locations et leurs informations</p>
        </div>
      </div>

      <div className="tenants-filters">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Rechercher par nom, prénom, téléphone du locataire ou du courtier"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="tenants-stats">
        <div className="stat-item">
          <span className="stat-number">{locations.length}</span>
          <span className="stat-label">Total</span>
        </div>
      </div>

      <div className="tenants-table-container">
        <table className="tenants-table">
          <thead>
            <tr>
              <th>Locataire</th>
              <th>Date d'entrée</th>
              <th>Date de sortie</th>
              <th>Prix par jour</th>
              <th>nbr personne</th>
              <th>ville du locataire</th>
              <th>Courtier</th>
              <th>Observation</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations.map((location) => (
              <tr key={location.id} className="tenant-row">
                <td
                  className="tenant-name-cell"
                  onClick={() => {
                    navigate(
                      "/view-locataire/" +
                        (location.locataire.id ||
                          location.locataire._id ||
                          location.locataire.locataireId)
                    );
                  }}
                  style={{
                    cursor: "pointer",
                    color: "#007bff",
                    textDecoration: "underline",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#0056b3";
                    e.target.style.textDecoration = "none";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#007bff";
                    e.target.style.textDecoration = "underline";
                  }}
                >
                  {location.locataire.nom + " " + location.locataire.prenom ||
                    "-"}
                </td>
                <td className="tenant-firstname-cell">
                  {location.dateEntree || "-"}
                </td>
                <td className="tenant-firstname-cell">
                  {location.dateSortie || "-"}
                </td>
                <td className="tenant-observation-cell">
                  {location.prixParJour || "-"}
                </td>
                <td className="tenant-observation-cell">
                  {location.nbrPersonne || "-"}
                </td>
                <td className="tenant-observation-cell">
                  {location.locataire.ville || "-"}
                </td>
                <td
                  className="tenant-name-cell"
                  onClick={() => {
                    navigate(
                      "/view-courtier/" +
                        (location.courtier.id ||
                          location.courtier._id ||
                          location.courtier.locataireId)
                    );
                  }}
                  style={{
                    cursor: "pointer",
                    color: "#007bff",
                    textDecoration: "underline",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#0056b3";
                    e.target.style.textDecoration = "none";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#007bff";
                    e.target.style.textDecoration = "underline";
                  }}
                >
                  {location.courtier.nom + " " + location.courtier.prenom ||
                    "-"}
                </td>
                <td className="tenant-observation-cell">
                  {location.observation || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredLocations.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">👥</div>
          <h3>Aucune location trouvé</h3>
          <p>Essayez de modifier vos critères de recherche</p>
        </div>
      )}
    </div>
  );
};

export default ViewApartments;
