package com.karima.karima.app.controller;

import com.karima.karima.app.model.Courtier;
import com.karima.karima.app.model.Locataire;
import com.karima.karima.app.repository.LocataireRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locataires")
@RequiredArgsConstructor
public class LocataireController {
    private final LocataireRepository locataireRepo;

    @GetMapping
    public List<Locataire> getAll() {
        return locataireRepo.findAllByOrderByIdAsc();
    }

    @PostMapping
    public Locataire create(@RequestBody Locataire l) {
        return locataireRepo.save(l);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Locataire> getlocataireById(@PathVariable Long id){
        return locataireRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Locataire> update(@PathVariable Long id,@RequestBody Locataire update){
        return locataireRepo.findById(id)
                .map(locat -> {
                    locat.setNom(update.getNom());
                    locat.setPrenom(update.getPrenom());
                    locat.setNumTel(update.getNumTel());
                    locat.setObservation(update.getObservation());
                    locat.setLocations(update.getLocations());
                    locat.setCin(update.getCin());
                    locat.setVille(update.getVille());
                    return ResponseEntity.ok(locataireRepo.save(locat));
                }).orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        locataireRepo.deleteById(id);
    }
}
