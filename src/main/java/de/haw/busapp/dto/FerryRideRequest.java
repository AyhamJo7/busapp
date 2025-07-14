package de.haw.busapp.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FerryRideRequest {
    private Long routeId;
    private Long shipId;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
}

