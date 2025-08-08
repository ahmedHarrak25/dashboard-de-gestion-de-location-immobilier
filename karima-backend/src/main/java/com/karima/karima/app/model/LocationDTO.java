package com.karima.karima.app.model;

import java.time.LocalDate;

public class LocationDTO {
    private Long appartement;
    private Long locataire;
    private Long courtier;

    private LocalDate dateEntree;
    private LocalDate dateSortie;
    private Double prixParJour;
    private Integer nbrPersonne;
    private String observation;

    public Long getAppartement() {
        return appartement;
    }

    public void setAppartement(Long appartement) {
        this.appartement = appartement;
    }

    public Long getLocataire() {
        return locataire;
    }

    public void setLocataire(Long locataire) {
        this.locataire = locataire;
    }

    public Long getCourtier() {
        return courtier;
    }

    public void setCourtier(Long courtier) {
        this.courtier = courtier;
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

    public Integer getNbrPersonne() {
        return nbrPersonne;
    }

    public void setNbrPersonne(Integer nbrPersonne) {
        this.nbrPersonne = nbrPersonne;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }
}
