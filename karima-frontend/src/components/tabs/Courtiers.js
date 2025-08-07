import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Tenants.css";
import axios from "axios";

const Courtiers = () => {
  const navigate = useNavigate();
  const [courtiers, setCourtiers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/courtiers")
      .then((response) => {
        setCourtiers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Courtiers:", error);
        setLoading(false);
      });
  }, []);

  const filteredCourtiers = courtiers.filter((courtier) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      courtier.nom?.toLowerCase().includes(searchLower) ||
      courtier.prenom?.toLowerCase().includes(searchLower) ||
      courtier.numTel?.includes(searchTerm) ||
      courtier.ville?.toLowerCase().includes(searchLower)
    );
  });

  const getInitials = (nom, prenom) => {
    const firstInitial = nom ? nom.charAt(0).toUpperCase() : "";
    const secondInitial = prenom ? prenom.charAt(0).toUpperCase() : "";
    return firstInitial + secondInitial;
  };

  const getRandomColor = (id) => {
    const colors = [
      "#667eea",
      "#2ed573",
      "#ffa502",
      "#9c27b0",
      "#2196F3",
      "#ff4757",
      "#4CAF50",
      "#FF9800",
    ];
    return colors[id % colors.length];
  };

  if (loading) {
    return (
      <div className="tenants">
        <div className="tenants-header">
          <h1>Courtiers</h1>
          <p>Gestion des courtiers</p>
        </div>
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Chargement des courtiers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tenants">
      <div className="tenants-header">
        <div className="header-content">
          <h1>Courtiers</h1>
          <p>Gestion des courtiers et leurs informations</p>
        </div>
        <button
          className="add-tenant-btn"
          onClick={() => navigate("/add-courtier")}
        >
          + Ajouter un courtier
        </button>
      </div>

      <div className="tenants-filters">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Rechercher par nom, prénom, téléphone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="tenants-stats">
        <div className="stat-item">
          <span className="stat-number">{courtiers.length}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {
              courtiers.filter(
                (t) => t.observation && t.observation.trim() !== ""
              ).length
            }
          </span>
          <span className="stat-label">Avec observations</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {courtiers.filter((t) => t.numTel && t.numTel.trim() !== "").length}
          </span>
          <span className="stat-label">Avec téléphone</span>
        </div>
      </div>

      <div className="tenants-table-container">
        <table className="tenants-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Téléphone</th>
              <th>Observation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourtiers.map((courtier) => (
              <tr key={courtier.id} className="tenant-row">
                <td className="tenant-name-cell">{courtier.nom || "-"}</td>
                <td className="tenant-firstname-cell">
                  {courtier.prenom || "-"}
                </td>
                <td className="tenant-phone-cell">{courtier.numTel || "-"}</td>
                <td className="tenant-observation-cell">
                  {courtier.observation && courtier.observation.trim() !== ""
                    ? courtier.observation
                    : "-"}
                </td>
                <td className="tenant-actions-cell">
                  <button
                    className="table-action-btn edit-btn"
                    onClick={() => {
                      console.log("Courtier object:", courtier);
                      navigate(
                        "/modify-courtier/" +
                          (courtier.id || courtier._id || courtier.locataireId)
                      );
                    }}
                  >
                    Modifier
                  </button>
                  <button className="table-action-btn view-btn">Voir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCourtiers.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">👥</div>
          <h3>Aucun courtier trouvé</h3>
          <p>Essayez de modifier vos critères de recherche</p>
        </div>
      )}
    </div>
  );
};

export default Courtiers;
