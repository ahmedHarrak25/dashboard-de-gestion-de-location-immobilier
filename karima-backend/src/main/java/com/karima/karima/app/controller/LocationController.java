package com.karima.karima.app.controller;

import com.karima.karima.app.model.*;
import com.karima.karima.app.repository.AppartementRepository;
import com.karima.karima.app.repository.CourtierRepository;
import com.karima.karima.app.repository.LocataireRepository;
import com.karima.karima.app.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/locations")
//@RequiredArgsConstructor
public class LocationController {

    private final LocationRepository locationRepo;
    private final AppartementRepository appartementRepo;
    private final LocataireRepository locataireRepo;
    private final CourtierRepository courtierRepo;

    @Autowired
    public LocationController (LocationRepository locationRepository, AppartementRepository appartementRepository,
    LocataireRepository locataireRepository, CourtierRepository courtierRepository){
        locationRepo=locationRepository;
        appartementRepo=appartementRepository;
        courtierRepo=courtierRepository;
        locataireRepo=locataireRepository;
    }

    @GetMapping
    public List<Location> getAll() {
        return locationRepo.findAll();

    }

    @GetMapping("/locataire/{id}")
    public List<Location> getByLocataire(@PathVariable Long id){
        return locationRepo.findByLocataireId(id);
    }

    @GetMapping("/courtier/{id}")
    public List<Location> getByCourtier(@PathVariable Long id){
        return locationRepo.findByCourtierId(id);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody LocationDTO dto){
        Optional<Locataire> locataireOpt = locataireRepo.findById(dto.getLocataire());
        Optional<Appartement> appartementOpt = appartementRepo.findById(dto.getAppartement());
        Optional<Courtier> courtierOpt = courtierRepo.findById(dto.getCourtier());

        if (locataireOpt.isEmpty() || appartementOpt.isEmpty() || courtierOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("ID(s) invalide(s)");
        }

        Appartement appartement = appartementOpt.get();

        LocalDate nde = dto.getDateEntree();
        LocalDate nds = dto.getDateSortie();

        if(nde == null || nds == null || nde.isAfter(nds)){
            ResponseEntity.badRequest().body("Dates d'entrée/sortie invalides.");
        }

        List <Location> existingLocations = locationRepo.findByAppartementId(appartement.getId());

        boolean conflict = existingLocations.stream().anyMatch(existing ->
                !(nde.isAfter(existing.getDateSortie())||nds.isBefore(existing.getDateEntree()))
                );
        if(conflict){
            return ResponseEntity.badRequest().body("L'appartement est déjà réservé pendant cette période.");
        }

        appartement.setOccupe(true);
        appartementRepo.save(appartement);

        Location l = new Location();
        l.setAppartement(appartement);
        l.setCourtier(courtierOpt.get());
        l.setLocataire(locataireOpt.get());
        l.setObservation(dto.getObservation());
        l.setDateEntree(dto.getDateEntree());
        l.setDateSortie(dto.getDateSortie());
        l.setNbrPersonne(dto.getNbrPersonne());
        l.setPrixParJour(dto.getPrixParJour());

        Location saved = locationRepo.save(l);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Location> getlocationById(@PathVariable Long id){
        return locationRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Location> updateLocation(@PathVariable Long id, @RequestBody Location updated) {
        return locationRepo.findById(id)
                .map(location -> {
                    location.setDateEntree(updated.getDateEntree());
                    location.setDateSortie(updated.getDateSortie());
                    location.setPrixParJour(updated.getPrixParJour());
                    location.setObservation(updated.getObservation());
                    location.setNbrPersonne(updated.getNbrPersonne());
                    location.setAppartement(updated.getAppartement());
                    location.setLocataire(updated.getLocataire());
                    location.setCourtier(updated.getCourtier());
                    return ResponseEntity.ok(locationRepo.save(location));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        locationRepo.deleteById(id);
    }

}
