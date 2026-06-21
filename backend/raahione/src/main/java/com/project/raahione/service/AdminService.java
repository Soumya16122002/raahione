package com.project.raahione.service;

import com.project.raahione.dto.AnalyticsResponse;
import com.project.raahione.repository.BookingRepository;
import com.project.raahione.repository.RideRepository;
import com.project.raahione.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final RideRepository rideRepository;
    private final BookingRepository bookingRepository;

    public AdminService(
            UserRepository userRepository,
            RideRepository rideRepository,
            BookingRepository bookingRepository) {

        this.userRepository = userRepository;
        this.rideRepository = rideRepository;
        this.bookingRepository = bookingRepository;
    }

    public AnalyticsResponse getAnalytics() {

        AnalyticsResponse response =
                new AnalyticsResponse();

        response.setTotalUsers(
                userRepository.count()
        );

        response.setTotalRides(
                rideRepository.count()
        );

        response.setTotalBookings(
                bookingRepository.count()
        );

        response.setTotalDrivers(
                userRepository.findAll()
                        .stream()
                        .filter(user ->
                                "DRIVER".equals(user.getRole()))
                        .count()
        );

        return response;
    }
}