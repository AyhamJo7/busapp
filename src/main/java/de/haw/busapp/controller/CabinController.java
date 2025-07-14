package de.haw.busapp.controller;

import de.haw.busapp.model.Cabin;
import de.haw.busapp.model.Ship;
import de.haw.busapp.repository.CabinRepository;
import de.haw.busapp.repository.ShipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ships/{shipId}/cabins")
@RequiredArgsConstructor
public class CabinController {

    private final ShipRepository shipRepository;
    private final CabinRepository cabinRepository;

    @PostMapping
    public ResponseEntity<?> addCabin(@PathVariable Long shipId, @RequestBody Cabin request) {
        Ship ship = shipRepository.findById(shipId)
                .orElseThrow(() -> new RuntimeException("Ship not found"));
        request.setShip(ship);
        Cabin saved = cabinRepository.save(request);
        return ResponseEntity.ok(saved);
    }
}