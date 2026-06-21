package com.project.raahione.service;
import java.util.List;
import com.project.raahione.dto.BookingRequest;
import com.project.raahione.entity.Booking;
import com.project.raahione.entity.Ride;
import com.project.raahione.entity.User;
import com.project.raahione.repository.BookingRepository;
import com.project.raahione.repository.RideRepository;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RideRepository rideRepository;
    private final UserService userService;

    public BookingService(BookingRepository bookingRepository,
                          RideRepository rideRepository,
                          UserService userService) {

        this.bookingRepository = bookingRepository;
        this.rideRepository = rideRepository;
        this.userService = userService;
    }

    public Booking bookRide(BookingRequest request) {

        User user = userService.getUserById(request.getUserId());

        Ride ride = rideRepository.findById(request.getRideId())
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        // Driver cannot book their own ride
        if (ride.getDriver().getId().equals(user.getId())) {
            throw new RuntimeException("Driver cannot book own ride");
        }

        List<Booking> existingBookings = bookingRepository.findByUserId(request.getUserId());

        for (Booking existingBooking : existingBookings) {

            // Rule 1: Only one active booking allowed at a time
            if (existingBooking.getStatus().equals("PENDING") ||
                    existingBooking.getStatus().equals("APPROVED")) {
                throw new RuntimeException(
                        "You already have an active booking. Cancel it before booking another ride."
                );
            }

            // Rule 2: Cannot rebook a rejected ride
            if (existingBooking.getRide().getId().equals(request.getRideId()) &&
                    existingBooking.getStatus().equals("REJECTED")) {
                throw new RuntimeException("You cannot rebook a ride that was rejected.");
            }
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRide(ride);
        booking.setSeatsBooked(request.getSeatsBooked());
        booking.setStatus("PENDING");

        return bookingRepository.save(booking);
    }
    public List<Booking> getBookingHistory(Long userId) {

        return bookingRepository.findByUserId(userId);
    }
    public Booking cancelBooking(Long bookingId) {

        Booking booking =
                bookingRepository.findById(bookingId)
                        .orElseThrow(() ->
                                new RuntimeException("Booking not found"));

        if (
                !booking.getStatus().equals("APPROVED")
                        &&
                        !booking.getStatus().equals("PENDING")
        ) {
            throw new RuntimeException(
                    "Only pending or approved bookings can be cancelled"
            );
        }

        Ride ride = booking.getRide();

        if (booking.getStatus().equals("APPROVED")) {

            ride.setAvailableSeats(
                    ride.getAvailableSeats()
                            + booking.getSeatsBooked()
            );

            rideRepository.save(ride);
        }

        booking.setStatus("CANCELLED");

        return bookingRepository.save(booking);
    }
    public Booking approveBooking(Long bookingId) {

        Booking booking =
                bookingRepository.findById(bookingId)
                        .orElseThrow(() ->
                                new RuntimeException("Booking not found"));
        if (!booking.getStatus().equals("PENDING")) {
            throw new RuntimeException(
                    "Only pending bookings can be approved"
            );
        }
        Ride ride = booking.getRide();


        if (ride.getAvailableSeats() < booking.getSeatsBooked()) {
            throw new RuntimeException("Seats not available");
        }

        ride.setAvailableSeats(
                ride.getAvailableSeats() - booking.getSeatsBooked()
        );

        rideRepository.save(ride);

        booking.setStatus("APPROVED");

        return bookingRepository.save(booking);
    }
    public Booking rejectBooking(Long bookingId) {

        Booking booking =
                bookingRepository.findById(bookingId)
                        .orElseThrow(() ->
                                new RuntimeException("Booking not found"));
        if (!booking.getStatus().equals("PENDING")) {
            throw new RuntimeException(
                    "Only pending bookings can be rejected"
            );
        }

        booking.setStatus("REJECTED");

        return bookingRepository.save(booking);
    }
    public List<Booking> getDriverBookings(Long driverId) {

        return bookingRepository.findByRideDriverId(driverId);
    }
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

}