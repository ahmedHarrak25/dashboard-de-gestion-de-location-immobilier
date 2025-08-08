package com.karima.karima.app.repository;

import com.karima.karima.app.model.Appartement;
import com.karima.karima.app.model.Locataire;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocataireRepository extends JpaRepository<Locataire, Long> {
    List<Locataire> findAllByOrderByIdAsc();
}
