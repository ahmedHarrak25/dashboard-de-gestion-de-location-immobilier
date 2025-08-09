import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/AddTenant.css";
import axios from "axios";

const ViewCourtier = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [locations, setLocations] = useState([]);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    numTel: "",
    observation: "",
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/courtiers/${id}`)
      .then((response) => {
        // Convert null values to empty strings to avoid React warnings
        const coutierData = response.data;
        setFormData({
          nom: coutierData.nom || "",
          prenom: coutierData.prenom || "",
          numTel: coutierData.numTel || "",
          observation: coutierData.observation || "",
        });
        setInitialLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courtier:", error);
        setError("Erreur lors du chargement du coutier.");
        setInitialLoading(false);
      });
  }, [id]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/locations/courtier/${id}`)
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching locations: " + error);
        setError("Erreur lors du chargment des locations.");
      });
  }, [id]);

  const handleCancel = () => {
    navigate(-1); // or whatever your tenant list route is
  };

  if (initialLoading) {
    return (
      <div className="add-tenant">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Chargement du courtier...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="add-tenant">
        <div className="add-tenant-header">
          <div className="header-content">
            <h1>Erreur</h1>
          </div>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Retour
          </button>
        </div>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="add-tenant">
      <div className="add-tenant-header">
        <div className="header-content">
          <h1>Informations sur le Courtier</h1>
        </div>
        <button className="back-btn" onClick={handleCancel}>
          ← Retour
        </button>
      </div>

      <div className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              className="form-input"
              placeholder="Nom du locataire"
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="prenom">Prénom</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              className="form-input"
              placeholder="Prénom du locataire"
              readOnly
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="numTel">Téléphone</label>
            <input
              type="tel"
              id="numTel"
              name="numTel"
              value={formData.numTel}
              className="form-input"
              placeholder="Numéro de téléphone"
              readOnly
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="observation">Observation</label>
          <textarea
            id="observation"
            name="observation"
            value={formData.observation}
            className="form-textarea"
            placeholder="Observations sur le locataire..."
            rows="4"
            readOnly
          />
        </div>
      </div>

      <div className="tenants-table-container">
        <table className="tenants-table">
          <thead>
            <tr>
              <th>Appartement</th>
              <th>Date d'entrée</th>
              <th>Date de sortie</th>
              <th>Prix par jour</th>
              <th>Nbr de personne</th>
              <th>Locataire</th>
              <th>Observation</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location.id} className="tenant-row">
                <td className="tenant-name-cell">
                  {location.appartement.appt || "-"}
                </td>
                <td className="tenant-firstname-cell">
                  {location.dateEntree || "-"}
                </td>
                <td className="tenant-firstname-cell">
                  {location.dateSortie || "-"}
                </td>
                <td className="tenant-firstname-cell">
                  {location.prixParJour || "-"}
                </td>
                <td className="tenant-firstname-cell">
                  {location.nbrPersonne || "-"}
                </td>
                <td className="tenant-firstname-cell">
                  {location.locataire.nom + " " + location.locataire.prenom ||
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
    </div>
  );
};
export default ViewCourtier;
