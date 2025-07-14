package de.haw.busapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FerryRide {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Route route;

    @ManyToOne
    private Ship ship;

    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;

    @Getter
    @OneToMany(mappedBy = "ferryRide", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<Booking> bookings = new ArrayList<>();

    public void addBooking(Booking booking) {
        bookings.add(booking);
        booking.setFerryRide(this);
    }

    public void removeBooking(Booking booking) {
        bookings.remove(booking);
        booking.setFerryRide(null);
    }
}