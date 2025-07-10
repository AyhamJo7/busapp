package de.haw.busapp.service;

import de.haw.busapp.model.*;
import de.haw.busapp.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final FerryRideRepository ferryRideRepository;
    private final CabinRepository cabinRepository;

    public BookingService(BookingRepository bookingRepository,
                          UserRepository userRepository,
                          FerryRideRepository ferryRideRepository,
                          CabinRepository cabinRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.ferryRideRepository = ferryRideRepository;
        this.cabinRepository = cabinRepository;
    }

    @Transactional
    public Booking createBooking(Long userId, Long ferryRideId, Long cabinId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Benutzer nicht gefunden"));
        FerryRide ferryRide = ferryRideRepository.findById(ferryRideId)
                .orElseThrow(() -> new IllegalArgumentException("Fährfahrt nicht gefunden"));
        Cabin cabin = cabinRepository.findById(cabinId)
                .orElseThrow(() -> new IllegalArgumentException("Kabine nicht gefunden"));

        boolean alreadyBooked = bookingRepository.existsByFerryRideAndCabin(ferryRide, cabin);
        if (alreadyBooked) {
            throw new IllegalArgumentException("Kabine ist für diese Fahrt bereits gebucht");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setFerryRide(ferryRide);
        booking.setCabin(cabin);
        booking.setBookingDate(LocalDateTime.now());

        return bookingRepository.save(booking);
    }
}