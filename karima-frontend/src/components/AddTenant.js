import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/AddTenant.css";
import axios from "axios";

const AddTenant = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    numTel: "",
    cin: "",
    ville: "",
    observation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:8080/api/locataires", formData);
      navigate("/tenants");
    } catch (error) {
      console.error("Error adding tenant:", error);
      setError("Erreur lors de l'ajout du locataire. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/tenants");
  };

  return (
    <div className="add-tenant">
      <div className="add-tenant-header">
        <div className="header-content">
          <h1>Ajouter un Locataire</h1>
          <p>Remplissez le formulaire pour ajouter un nouveau locataire</p>
        </div>
        <button className="back-btn" onClick={handleCancel}>
          ← Retour
        </button>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="tenant-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nom">Nom *</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="Nom du locataire"
              />
            </div>
            <div className="form-group">
              <label htmlFor="prenom">Prénom *</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="Prénom du locataire"
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
                onChange={handleInputChange}
                className="form-input"
                placeholder="Numéro de téléphone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cin">CIN</label>
              <input
                type="text"
                id="cin"
                name="cin"
                value={formData.cin}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Numéro CIN"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="ville">Ville</label>
            <input
              type="text"
              id="ville"
              name="ville"
              value={formData.ville}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Ville du locataire"
            />
          </div>

          <div className="form-group">
            <label htmlFor="observation">Observation</label>
            <textarea
              id="observation"
              name="observation"
              value={formData.observation}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Observations sur le locataire..."
              rows="4"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-btn"
              disabled={loading}
            >
              Annuler
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Ajout en cours..." : "Ajouter le locataire"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTenant;
