package de.haw.busapp.controller;

import de.haw.busapp.dto.BookingResponse;
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
import java.util.stream.Collectors;

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
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        List<BookingResponse> bookingResponses = bookings.stream()
            .map(this::convertToBookingResponse)
            .collect(Collectors.toList());
        return ResponseEntity.ok(bookingResponses);
    }
    
    private BookingResponse convertToBookingResponse(Booking booking) {
        FerryRide ferryRide = booking.getFerryRide();
        
        BookingResponse.HarborInfo originHarbor = new BookingResponse.HarborInfo(
            ferryRide.getRoute().getOriginHarbor().getId(),
            ferryRide.getRoute().getOriginHarbor().getName(),
            ferryRide.getRoute().getOriginHarbor().getLocation()
        );
        
        BookingResponse.HarborInfo destinationHarbor = new BookingResponse.HarborInfo(
            ferryRide.getRoute().getDestinationHarbor().getId(),
            ferryRide.getRoute().getDestinationHarbor().getName(),
            ferryRide.getRoute().getDestinationHarbor().getLocation()
        );
        
        BookingResponse.RouteInfo routeInfo = new BookingResponse.RouteInfo(
            ferryRide.getRoute().getId(),
            originHarbor,
            destinationHarbor
        );
        
        BookingResponse.ShipInfo shipInfo = new BookingResponse.ShipInfo(
            ferryRide.getShip().getId(),
            ferryRide.getShip().getName(),
            ferryRide.getShip().getCapacity()
        );
        
        BookingResponse.FerryRideInfo ferryRideInfo = new BookingResponse.FerryRideInfo(
            ferryRide.getId(),
            ferryRide.getDepartureTime(),
            ferryRide.getArrivalTime(),
            routeInfo,
            shipInfo
        );
        
        return new BookingResponse(
            booking.getId(),
            booking.getBookingDate(),
            ferryRideInfo
        );
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
