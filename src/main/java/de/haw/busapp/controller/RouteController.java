package de.haw.busapp.controller;

import de.haw.busapp.model.Route;
import de.haw.busapp.repository.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
public class RouteController {

    private final RouteRepository routeRepository;

    @PostMapping
    public ResponseEntity<?> addRoute(@RequestBody Route request) {
        Route saved = routeRepository.save(request);
        return ResponseEntity.ok(saved);
    }
}