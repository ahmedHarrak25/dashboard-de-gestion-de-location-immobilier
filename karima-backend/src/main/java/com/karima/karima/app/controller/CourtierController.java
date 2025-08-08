package com.karima.karima.app.controller;

import com.karima.karima.app.model.Courtier;
import com.karima.karima.app.repository.CourtierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courtiers")
@RequiredArgsConstructor
public class CourtierController {
    private final CourtierRepository courtierRepo;

    @GetMapping
    public List<Courtier> getCourtiers(){
        return courtierRepo.findAllByOrderByIdAsc();
    }

    @PostMapping
    public Courtier create(@RequestBody Courtier court){
        return courtierRepo.save(court);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Courtier> getCourtierById(@PathVariable Long id){
        return courtierRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Courtier> update(@PathVariable Long id,@RequestBody Courtier update){
        return courtierRepo.findById(id)
                .map(court -> {
                    court.setNom(update.getNom());
                    court.setPrenom(update.getPrenom());
                    court.setNumTel(update.getNumTel());
                    court.setObservation(update.getObservation());
                    court.setLocations(update.getLocations());
                    return ResponseEntity.ok(courtierRepo.save(court));
                }).orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        courtierRepo.deleteById(id);
    }

}
