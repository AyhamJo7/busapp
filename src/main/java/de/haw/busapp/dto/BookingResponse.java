package de.haw.busapp.dto;

import java.time.LocalDateTime;

public class BookingResponse {
    private Long id;
    private LocalDateTime bookingDate;
    private FerryRideInfo ferryRide;
    
    public BookingResponse() {}
    
    public BookingResponse(Long id, LocalDateTime bookingDate, FerryRideInfo ferryRide) {
        this.id = id;
        this.bookingDate = bookingDate;
        this.ferryRide = ferryRide;
    }
    
    // Getters and setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public LocalDateTime getBookingDate() {
        return bookingDate;
    }
    
    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }
    
    public FerryRideInfo getFerryRide() {
        return ferryRide;
    }
    
    public void setFerryRide(FerryRideInfo ferryRide) {
        this.ferryRide = ferryRide;
    }
    
    public static class FerryRideInfo {
        private Long id;
        private LocalDateTime departureTime;
        private LocalDateTime arrivalTime;
        private RouteInfo route;
        private ShipInfo ship;
        
        public FerryRideInfo() {}
        
        public FerryRideInfo(Long id, LocalDateTime departureTime, LocalDateTime arrivalTime, RouteInfo route, ShipInfo ship) {
            this.id = id;
            this.departureTime = departureTime;
            this.arrivalTime = arrivalTime;
            this.route = route;
            this.ship = ship;
        }
        
        // Getters and setters
        public Long getId() {
            return id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public LocalDateTime getDepartureTime() {
            return departureTime;
        }
        
        public void setDepartureTime(LocalDateTime departureTime) {
            this.departureTime = departureTime;
        }
        
        public LocalDateTime getArrivalTime() {
            return arrivalTime;
        }
        
        public void setArrivalTime(LocalDateTime arrivalTime) {
            this.arrivalTime = arrivalTime;
        }
        
        public RouteInfo getRoute() {
            return route;
        }
        
        public void setRoute(RouteInfo route) {
            this.route = route;
        }
        
        public ShipInfo getShip() {
            return ship;
        }
        
        public void setShip(ShipInfo ship) {
            this.ship = ship;
        }
    }
    
    public static class RouteInfo {
        private Long id;
        private HarborInfo originHarbor;
        private HarborInfo destinationHarbor;
        
        public RouteInfo() {}
        
        public RouteInfo(Long id, HarborInfo originHarbor, HarborInfo destinationHarbor) {
            this.id = id;
            this.originHarbor = originHarbor;
            this.destinationHarbor = destinationHarbor;
        }
        
        // Getters and setters
        public Long getId() {
            return id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public HarborInfo getOriginHarbor() {
            return originHarbor;
        }
        
        public void setOriginHarbor(HarborInfo originHarbor) {
            this.originHarbor = originHarbor;
        }
        
        public HarborInfo getDestinationHarbor() {
            return destinationHarbor;
        }
        
        public void setDestinationHarbor(HarborInfo destinationHarbor) {
            this.destinationHarbor = destinationHarbor;
        }
    }
    
    public static class HarborInfo {
        private Long id;
        private String name;
        private String location;
        
        public HarborInfo() {}
        
        public HarborInfo(Long id, String name, String location) {
            this.id = id;
            this.name = name;
            this.location = location;
        }
        
        // Getters and setters
        public Long getId() {
            return id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getName() {
            return name;
        }
        
        public void setName(String name) {
            this.name = name;
        }
        
        public String getLocation() {
            return location;
        }
        
        public void setLocation(String location) {
            this.location = location;
        }
    }
    
    public static class ShipInfo {
        private Long id;
        private String name;
        private int capacity;
        
        public ShipInfo() {}
        
        public ShipInfo(Long id, String name, int capacity) {
            this.id = id;
            this.name = name;
            this.capacity = capacity;
        }
        
        // Getters and setters
        public Long getId() {
            return id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getName() {
            return name;
        }
        
        public void setName(String name) {
            this.name = name;
        }
        
        public int getCapacity() {
            return capacity;
        }
        
        public void setCapacity(int capacity) {
            this.capacity = capacity;
        }
    }
}
