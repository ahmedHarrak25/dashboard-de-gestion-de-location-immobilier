package com.karima.karima.app.controller;

import com.karima.karima.app.model.Appartement;
import com.karima.karima.app.model.Location;
import com.karima.karima.app.repository.AppartementRepository;
import com.karima.karima.app.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appartements")
@RequiredArgsConstructor
public class AppartementController {
    @Autowired
    private final AppartementRepository appartementRepo;

    @Autowired
    private final LocationRepository locationRepo;


    public void checkStatus(){
        List<Appartement> appartements = appartementRepo.findAll();
        LocalDate today = LocalDate.now();

        for(Appartement appart : appartements) {
            List<Location> locations = locationRepo.findByAppartementId(appart.getId());
            boolean isOccupied = locations.stream().anyMatch(location ->
                    !today.isBefore(location.getDateEntree()) && today.isBefore(location.getDateSortie())
            );
            appart.setOccupe(isOccupied);
            appartementRepo.save(appart);
        }
    }

    @GetMapping
    public List<Appartement> getAppartements(){
        checkStatus();
        return appartementRepo.findAllByOrderByIdAsc();
    }

    @PostMapping
    public Appartement create(@RequestBody Appartement appt){
        return appartementRepo.save(appt);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appartement> getAppartementById(@PathVariable Long id){
        return appartementRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appartement> update(@PathVariable Long id, @RequestBody Appartement update){
        return appartementRepo.findById(id)
                .map(appart -> {
                    appart.setAppt(update.getAppt());
                    appart.setOccupe(update.isOccupe());
                    return ResponseEntity.ok(appartementRepo.save(appart));
                }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status-change")
    public ResponseEntity<Appartement> updateStatus(@PathVariable Long id){
        return appartementRepo.findById(id)
                .map(appart -> {
                    appart.setOccupe(!appart.isOccupe());
                    return ResponseEntity.ok(appartementRepo.save(appart));
                }).orElse(ResponseEntity.notFound().build());
    }
}
