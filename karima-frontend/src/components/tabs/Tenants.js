import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Tenants.css";
import axios from "axios";

const Tenants = () => {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/locataires")
      .then((response) => {
        setTenants(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tenants:", error);
        setLoading(false);
      });
  }, []);

  const filteredTenants = tenants.filter((tenant) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      tenant.nom?.toLowerCase().includes(searchLower) ||
      tenant.prenom?.toLowerCase().includes(searchLower) ||
      tenant.numTel?.includes(searchTerm) ||
      tenant.cin?.toLowerCase().includes(searchLower) ||
      tenant.ville?.toLowerCase().includes(searchLower)
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
          <h1>Locataires</h1>
          <p>Gestion des locataires</p>
        </div>
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Chargement des locataires...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tenants">
      <div className="tenants-header">
        <div className="header-content">
          <h1>Locataires</h1>
          <p>Gestion des locataires et leurs informations</p>
        </div>
        <button
          className="add-tenant-btn"
          onClick={() => navigate("/add-tenant")}
        >
          + Ajouter un locataire
        </button>
      </div>

      <div className="tenants-filters">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Rechercher par nom, prénom, téléphone, CIN ou ville..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="tenants-stats">
        <div className="stat-item">
          <span className="stat-number">{tenants.length}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {
              tenants.filter(
                (t) => t.observation && t.observation.trim() !== ""
              ).length
            }
          </span>
          <span className="stat-label">Avec observations</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {tenants.filter((t) => t.numTel && t.numTel.trim() !== "").length}
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
              <th>CIN</th>
              <th>Ville</th>
              <th>Observation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.map((tenant) => (
              <tr key={tenant.id} className="tenant-row">
                <td className="tenant-name-cell">{tenant.nom || "-"}</td>
                <td className="tenant-firstname-cell">
                  {tenant.prenom || "-"}
                </td>
                <td className="tenant-phone-cell">{tenant.numTel || "-"}</td>
                <td className="tenant-cin-cell">{tenant.cin || "-"}</td>
                <td className="tenant-city-cell">{tenant.ville || "-"}</td>
                <td className="tenant-observation-cell">
                  {tenant.observation && tenant.observation.trim() !== ""
                    ? tenant.observation
                    : "-"}
                </td>
                <td className="tenant-actions-cell">
                  <button
                    className="table-action-btn edit-btn"
                    onClick={() => {
                      console.log("Tenant object:", tenant);
                      navigate(
                        "/modify-tenant/" +
                          (tenant.id || tenant._id || tenant.locataireId)
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

      {filteredTenants.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">👥</div>
          <h3>Aucun locataire trouvé</h3>
          <p>Essayez de modifier vos critères de recherche</p>
        </div>
      )}
    </div>
  );
};

export default Tenants;
