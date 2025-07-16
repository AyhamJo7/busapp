package de.haw.busapp.dto;

public class CreateBookingRequest {
    private Long userId;
    private Long ferryRideId;
    private Long cabinId;
    private String bookingDate;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getFerryRideId() {
        return ferryRideId;
    }

    public void setFerryRideId(Long ferryRideId) {
        this.ferryRideId = ferryRideId;
    }

    public Long getCabinId() {
        return cabinId;
    }

    public void setCabinId(Long cabinId) {
        this.cabinId = cabinId;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }
}
