package de.haw.busapp.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonManagedReference
    private List<Booking> bookings = new ArrayList<>();

    // Explicit getter methods
    public Long getId() {
        return id;
    }

    public Route getRoute() {
        return route;
    }

    public Ship getShip() {
        return ship;
    }

    public LocalDateTime getDepartureTime() {
        return departureTime;
    }

    public LocalDateTime getArrivalTime() {
        return arrivalTime;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    // Setter methods
    public void setId(Long id) {
        this.id = id;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public void setShip(Ship ship) {
        this.ship = ship;
    }

    public void setDepartureTime(LocalDateTime departureTime) {
        this.departureTime = departureTime;
    }

    public void setArrivalTime(LocalDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public void addBooking(Booking booking) {
        bookings.add(booking);
        booking.setFerryRide(this);
    }

    public void removeBooking(Booking booking) {
        bookings.remove(booking);
        booking.setFerryRide(null);
    }
}
