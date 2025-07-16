package de.haw.busapp.repository;

import de.haw.busapp.model.Booking;
import de.haw.busapp.model.FerryRide;
import de.haw.busapp.model.Cabin;
import de.haw.busapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    boolean existsByFerryRideAndCabin(FerryRide ferryRide, Cabin cabin);
    List<Booking> findByUserId(Long userId);
}