package com.karima.karima.app.repository;

import com.karima.karima.app.model.Appartement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppartementRepository extends JpaRepository<Appartement, Long> {
    List<Appartement> findAllByOrderByIdAsc();
}
