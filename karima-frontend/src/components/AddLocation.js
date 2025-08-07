import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/AddTenant.css";
import axios from "axios";

const AddLocation = () => {
  const navigate = useNavigate();
  const [locataires, setTenants] = useState([]);
  const [appartements, setAppartements] = useState([]);

  const [courtiers, setCourtiers] = useState([]);

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

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/courtiers")
      .then((response) => {
        setCourtiers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courtiers:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/appartements")
      .then((response) => {
        setAppartements(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appartements:", error);
        setLoading(false);
      });
  }, []);

  const [formData, setFormData] = useState({
    locataire: "",
    courtier: "",
    dateEntree: "",
    prixParJour: "",
    Obeservation: "",
    nbrPersonne: "",
    appartement: "",
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
      await axios.post("http://localhost:8080/api/locations", formData);
      navigate("/rentals");
    } catch (error) {
      console.error("Error adding courtier:", error);
      setError("Erreur lors de l'ajout de la location: " + error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/rentals");
  };

  return (
    <div className="add-tenant">
      <div className="add-tenant-header">
        <div className="header-content">
          <h1>Ajouter une location</h1>
          <p>Remplissez le formulaire pour ajouter une nouvelle location</p>
        </div>
        <button className="back-btn" onClick={handleCancel}>
          ← Retour
        </button>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="tenant-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateEntree">Date d'entrée *</label>
              <input
                type="date"
                id="dateEntree"
                name="dateEntree"
                value={formData.dateEntree}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateSortie">Date de sortie *</label>
              <input
                type="date"
                id="dateSortie"
                name="dateSortie"
                value={formData.dateSortie}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="appartement">Appartement *</label>
              <select
                id="appartement"
                name="appartement"
                value={formData.appartement}
                onChange={handleInputChange}
                required
                className="form-input"
              >
                <option value="">Sélectionner un appartement</option>
                {appartements.map((appt) => (
                  <option key={appt.id} value={appt.id}>
                    {appt.appt}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="locataire">Locataire *</label>
              <select
                id="locataire"
                name="locataire"
                value={formData.locataire}
                onChange={handleInputChange}
                required
                className="form-input"
              >
                <option value="">Sélectionner un locataire</option>
                {locataires.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.nom} {loc.prenom}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prixParJour">Prix par jour *</label>
              <input
                type="number"
                id="prixParJour"
                name="prixParJour"
                value={formData.prixParJour}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="Ex: 150.00"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label htmlFor="nbrPersonne">Nombre de personnes *</label>
              <input
                type="number"
                id="nbrPersonne"
                name="nbrPersonne"
                value={formData.nbrPersonne}
                onChange={handleInputChange}
                required
                className="form-input"
                min="1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="courtier">Courtier *</label>
              <select
                id="courtier"
                name="courtier"
                value={formData.courtier}
                onChange={handleInputChange}
                required
                className="form-input"
              >
                <option value="">Sélectionner un courtier</option>
                {courtiers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nom} {c.prenom}
                  </option>
                ))}
              </select>
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
              placeholder="Observations sur la location..."
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
              {loading ? "Ajout en cours..." : "Ajouter la location"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLocation;
