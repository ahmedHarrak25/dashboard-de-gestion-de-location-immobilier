package com.karima.karima.app.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Appartement {
    public Long getId() {
        return id;
    }

    public boolean isOccupe() {
        return occupe;
    }

    public void setOccupe(boolean occupe) {
        this.occupe = occupe;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAppt() {
        return appt;
    }

    public void setAppt(String appt) {
        this.appt = appt;
    }

    public List<Location> getLocations() {
        return locations;
    }

    public void setLocations(List<Location> locations) {
        this.locations = locations;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String appt;
    private boolean occupe = false;


    @OneToMany(mappedBy = "appartement")
//    @JsonManagedReference(value = "appartement-location")
    private List<Location> locations;
}
