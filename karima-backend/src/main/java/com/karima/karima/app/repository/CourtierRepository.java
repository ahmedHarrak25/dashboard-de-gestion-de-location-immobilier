package com.karima.karima.app.repository;

import com.karima.karima.app.model.Courtier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourtierRepository extends JpaRepository<Courtier, Long> {
    List<Courtier> findAllByOrderByIdAsc();
}
