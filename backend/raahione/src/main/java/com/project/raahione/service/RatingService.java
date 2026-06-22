package com.project.raahione.service;

import com.project.raahione.dto.RatingRequest;
import com.project.raahione.entity.Rating;
import com.project.raahione.entity.Ride;
import com.project.raahione.entity.User;
import com.project.raahione.repository.BookingRepository;
import com.project.raahione.repository.RatingRepository;
import com.project.raahione.repository.RideRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    private final RatingRepository ratingRepository;
    private final RideRepository rideRepository;
    private final UserService userService;
    private final BookingRepository bookingRepository;

    public RatingService(RatingRepository ratingRepository,
                         RideRepository rideRepository,
                         UserService userService,BookingRepository bookingRepository) {

        this.ratingRepository = ratingRepository;
        this.rideRepository = rideRepository;
        this.userService = userService;
        this.bookingRepository = bookingRepository;

    }

    public Rating addRating(RatingRequest request) {
        boolean allowed =
                bookingRepository
                        .existsByUserIdAndRideIdAndStatus(
                                request.getUserId(),
                                request.getRideId(),
                                "APPROVED"
                        );

        if (!allowed) {
            throw new RuntimeException(
                    "Only approved passengers can rate"
            );
        }

        if (ratingRepository.existsByUserIdAndRideId(
                request.getUserId(),
                request.getRideId()
        )) {

            throw new RuntimeException(
                    "You have already rated this ride"
            );
        }

        User user =
                userService.getUserById(request.getUserId());

        Ride ride =
                rideRepository.findById(request.getRideId())
                        .orElseThrow(() ->
                                new RuntimeException("Ride not found"));
        if (!"COMPLETED".equals(ride.getStatus())) {

            throw new RuntimeException(
                    "Ride must be completed before rating"
            );
        }

        Rating rating = new Rating();

        rating.setUser(user);
        rating.setRide(ride);
        rating.setRating(request.getRating());
        rating.setReview(request.getReview());

        return ratingRepository.save(rating);
    }
    public List<Rating> getRatings(
            Long rideId
    ) {
        return ratingRepository.findByRideId(rideId);
    }
    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }
}