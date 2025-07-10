package de.haw.busapp.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class CreateBookingRequest {
    // Wenn Lombok nicht funktioniert:
    @Setter
    @Getter
    private Long userId;
    private Long ferryRideId;
    private Long cabinId;
    private String bookingDate; // oder LocalDateTime

}
