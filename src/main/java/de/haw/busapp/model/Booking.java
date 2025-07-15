package de.haw.busapp.model;

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
    private User user;

    @ManyToOne
    private FerryRide ferryRide;

    @ManyToOne
    private Cabin cabin;

    private LocalDateTime bookingDate;

    // Manuelle Implementierung falls kein Lombok:
    public void setUser(User user) {
        this.user = Objects.requireNonNull(user, "User darf nicht null sein");
        user.getBookings().add(this); // Aktualisiere inverse Seite
    }

    public void setFerryRide(FerryRide ferryRide) {
        this.ferryRide = Objects.requireNonNull(ferryRide, "Fährfahrt darf nicht null sein");
        ferryRide.getBookings().add(this);
    }

    public void setCabin(Cabin cabin) {
        this.cabin = Objects.requireNonNull(cabin, "Kabine darf nicht null sein");
        cabin.getBookings().add(this);
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = Objects.requireNonNull(bookingDate, "Buchungsdatum darf nicht null sein");
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", user=" + (user != null ? user.getId() : "null") +
                ", ferryRide=" + (ferryRide != null ? ferryRide.getId() : "null") +
                ", cabin=" + (cabin != null ? cabin.getId() : "null") +
                ", bookingDate=" + bookingDate +
                '}';
    }
}