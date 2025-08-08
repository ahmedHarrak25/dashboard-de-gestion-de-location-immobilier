package com.karima.karima.app.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private LocalDate dateEntree;
    private LocalDate dateSortie;
    private Double prixParJour;
    private String Observation;
    private Integer nbrPersonne;

    @ManyToOne
    @JsonIgnoreProperties("locations")
    private Appartement appartement;

    @ManyToOne
    @JsonIgnoreProperties("locations")
    private Locataire locataire;

    @ManyToOne
    @JsonIgnoreProperties("locations")
    private Courtier courtier;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateEntree() {
        return dateEntree;
    }

    public void setDateEntree(LocalDate dateEntree) {
        this.dateEntree = dateEntree;
    }

    public LocalDate getDateSortie() {
        return dateSortie;
    }

    public void setDateSortie(LocalDate dateSortie) {
        this.dateSortie = dateSortie;
    }

    public Double getPrixParJour() {
        return prixParJour;
    }

    public void setPrixParJour(Double prixParJour) {
        this.prixParJour = prixParJour;
    }

    public String getObservation() {
        return Observation;
    }

    public void setObservation(String observation) {
        Observation = observation;
    }

    public Integer getNbrPersonne() {
        return nbrPersonne;
    }

    public void setNbrPersonne(Integer nbrPersonne) {
        this.nbrPersonne = nbrPersonne;
    }

    public Appartement getAppartement() {
        return appartement;
    }

    public void setAppartement(Appartement appartement) {
        this.appartement = appartement;
    }

    public Locataire getLocataire() {
        return locataire;
    }

    public void setLocataire(Locataire locataire) {
        this.locataire = locataire;
    }

    public Courtier getCourtier() {
        return courtier;
    }

    public void setCourtier(Courtier courtier) {
        this.courtier = courtier;
    }
}
