package de.haw.busapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Getter
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    private User user;

    @ManyToOne
    @JsonBackReference
    private FerryRide ferryRide;

    @ManyToOne
    private Cabin cabin;

    private LocalDateTime bookingDate;

    // Getter methods
    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public FerryRide getFerryRide() {
        return ferryRide;
    }

    public Cabin getCabin() {
        return cabin;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    // Setter methods
    public void setUser(User user) {
        this.user = user;
    }

    public void setFerryRide(FerryRide ferryRide) {
        this.ferryRide = ferryRide;
    }

    public void setCabin(Cabin cabin) {
        this.cabin = cabin;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }
}
