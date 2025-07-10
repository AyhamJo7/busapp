package de.haw.busapp.repository;

import de.haw.busapp.model.Booking;
import de.haw.busapp.model.FerryRide;
import de.haw.busapp.model.Cabin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    boolean existsByFerryRideAndCabin(FerryRide ferryRide, Cabin cabin);
}