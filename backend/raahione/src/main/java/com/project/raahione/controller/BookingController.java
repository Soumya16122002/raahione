package com.project.raahione.controller;
import java.util.List;
import com.project.raahione.dto.BookingRequest;
import com.project.raahione.entity.Booking;
import com.project.raahione.entity.Ride;
import com.project.raahione.entity.User;
import com.project.raahione.service.BookingService;
import com.project.raahione.service.RideService;
import com.project.raahione.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking bookRide(
            @RequestBody BookingRequest request) {

        return bookingService.bookRide(request);
    }
    @GetMapping("/history/{userId}")
    public List<Booking> getHistory(
            @PathVariable Long userId) {

        return bookingService.getBookingHistory(userId);
    }
    @PutMapping("/cancel/{bookingId}")
    public Booking cancelBooking(
            @PathVariable Long bookingId) {

        return bookingService.cancelBooking(bookingId);
    }
    @PutMapping("/approve/{bookingId}")
    public Booking approveBooking(
            @PathVariable Long bookingId) {

        return bookingService.approveBooking(bookingId);
    }
    @PutMapping("/reject/{bookingId}")
    public Booking rejectBooking(
            @PathVariable Long bookingId) {

        return bookingService.rejectBooking(bookingId);
    }
    @GetMapping("/driver/{driverId}")
    public List<Booking> getDriverBookings(
            @PathVariable Long driverId) {

        return bookingService.getDriverBookings(driverId);
    }

    @RestController
    @RequestMapping("/admin")
    public static class AdminController {

        private final UserService userService;
        private final RideService rideService;
        private final BookingService bookingService;
        public AdminController(UserService userService,
                               RideService rideService,
                               BookingService bookingService) {

            this.userService = userService;
            this.rideService = rideService;
            this.bookingService = bookingService;
        }

        @GetMapping("/users")
        public List<User> getAllUsers() {
            return userService.getAllUsers();
        }
        @GetMapping("/rides")
        public List<Ride> getAllRides() {
            return rideService.getAllRides();
        }
        @GetMapping("/bookings")
        public List<Booking> getAllBookings() {
            return bookingService.getAllBookings();
        }
        @GetMapping("/stats")
        public String getStats() {
            return "Users: " + userService.getAllUsers().size()
                    + ", Rides: " + rideService.getAllRides().size()
                    + ", Bookings: " + bookingService.getAllBookings().size();
        }
    }
}