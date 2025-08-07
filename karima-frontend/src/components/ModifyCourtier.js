import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/AddTenant.css";
import axios from "axios";

const ModifyCourtier = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    numTel: "",
    observation: "",
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("ModifyCourtier - ID from URL:", id);
    console.log(
      "ModifyCourtier - Full URL pathname:",
      window.location.pathname
    );

    if (!id) {
      console.warn("ID is undefined. Skipping fetch.");
      setError("ID du locataire manquant.");
      setInitialLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/api/courtiers/${id}`)
      .then((response) => {
        // Convert null values to empty strings to avoid React warnings
        const courtierData = response.data;
        setFormData({
          nom: courtierData.nom || "",
          prenom: courtierData.prenom || "",
          numTel: courtierData.numTel || "",
          observation: courtierData.observation || "",
        });
        setInitialLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courtier:", error);
        setError("Erreur lors du chargement du courtier.");
        setInitialLoading(false);
      });
  }, [id]);

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
          <button className="back-btn" onClick={() => navigate("/courtiers")}>
            ← Retour
          </button>
        </div>
        <div className="error-message">{error}</div>
      </div>
    );
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await axios.put(`http://localhost:8080/api/courtiers/${id}`, formData);
      navigate("/courtiers");
    } catch (error) {
      console.error("Error updating courtier:", error);
      setError(
        "Erreur lors de la modification du courtier. Veuillez réessayer."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/courtiers");
  };

  return (
    <div className="add-tenant">
      <div className="add-tenant-header">
        <div className="header-content">
          <h1>Modifier le courtier</h1>
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
                placeholder="Nom du courtier"
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
                placeholder="Prénom du courtier"
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
                placeholder="Numéro de courtier"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="observation">Observation</label>
            <textarea
              id="observation"
              name="observation"
              value={formData.observation}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Observations sur le courtier..."
              rows="4"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-btn"
              disabled={submitting}
            >
              Annuler
            </button>
            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? "Modification en cours..." : "Modifier le courtier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyCourtier;
