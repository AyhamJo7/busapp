package de.haw.busapp.controller;

import de.haw.busapp.dto.FerryRideRequest;
import de.haw.busapp.model.FerryRide;
import de.haw.busapp.model.Route;
import de.haw.busapp.model.Ship;
import de.haw.busapp.repository.FerryRideRepository;
import de.haw.busapp.repository.RouteRepository;
import de.haw.busapp.repository.ShipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
@RequiredArgsConstructor
public class FerryRideController {

    private final FerryRideRepository ferryRideRepository;
    private final RouteRepository routeRepository;
    private final ShipRepository shipRepository;

    @PostMapping
    public ResponseEntity<?> addRide(@RequestBody FerryRideRequest request) {
        Route route = routeRepository.findById(request.getRouteId())
                .orElseThrow(() -> new RuntimeException("Route nicht gefunden"));
        Ship ship = shipRepository.findById(request.getShipId())
                .orElseThrow(() -> new RuntimeException("Ship nicht gefunden"));

        FerryRide ferryRide = new FerryRide();
        ferryRide.setRoute(route);
        ferryRide.setShip(ship);
        ferryRide.setDepartureTime(request.getDepartureTime());
        ferryRide.setArrivalTime(request.getArrivalTime());

        ferryRideRepository.save(ferryRide);
        return ResponseEntity.ok("Fahrt erfolgreich erstellt!");
    }

    @GetMapping
    public List<FerryRide> getAllRides() {
        return ferryRideRepository.findAll();
    }

}

