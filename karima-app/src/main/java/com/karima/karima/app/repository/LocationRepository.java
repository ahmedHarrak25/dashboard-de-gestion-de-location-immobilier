package com.karima.karima.app.repository;

import com.karima.karima.app.model.Appartement;
import com.karima.karima.app.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {
    List<Location> findByAppartementId(Long appartementId);
}
