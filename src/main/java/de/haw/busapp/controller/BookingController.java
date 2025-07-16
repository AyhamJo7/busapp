package de.haw.busapp.controller;

import de.haw.busapp.dto.CreateBookingRequest;
import de.haw.busapp.model.Booking;
import de.haw.busapp.model.User;
import de.haw.busapp.model.FerryRide;
import de.haw.busapp.model.Cabin;
import de.haw.busapp.repository.BookingRepository;
import de.haw.busapp.repository.UserRepository;
import de.haw.busapp.repository.FerryRideRepository;
import de.haw.busapp.repository.CabinRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FerryRideRepository ferryRideRepository;
    @Autowired
    private CabinRepository cabinRepository;

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return ResponseEntity.ok(bookings);
    }

    @PostMapping
    public ResponseEntity<Void> createBooking(@RequestBody CreateBookingRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow();
        FerryRide ferryRide = ferryRideRepository.findById(request.getFerryRideId()).orElseThrow();
        //Cabin cabin = cabinRepository.findById(request.getCabinId()).orElseThrow();

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setFerryRide(ferryRide);
        //booking.setCabin(cabin);
        
        // Parse the bookingDate string to LocalDateTime
        LocalDateTime bookingDateTime;
        if (request.getBookingDate() != null && !request.getBookingDate().isEmpty()) {
            bookingDateTime = LocalDateTime.parse(request.getBookingDate(), DateTimeFormatter.ISO_DATE_TIME);
        } else {
            bookingDateTime = LocalDateTime.now();
        }
        booking.setBookingDate(bookingDateTime);

        booking = bookingRepository.save(booking);
        URI location = URI.create("/api/bookings/" + booking.getId());
        return ResponseEntity.created(location).build();
    }
}
