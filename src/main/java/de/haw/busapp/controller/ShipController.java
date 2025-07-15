package de.haw.busapp.controller;


import de.haw.busapp.model.Ship;
import de.haw.busapp.repository.ShipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ships")
@RequiredArgsConstructor
public class ShipController {

    private final ShipRepository shipRepository;

    @PostMapping
    public ResponseEntity<?> addShip(@RequestBody Ship request) {
        Ship saved = shipRepository.save(request);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<?> getAllShips() {
        return ResponseEntity.ok(shipRepository.findAll());
    }
}