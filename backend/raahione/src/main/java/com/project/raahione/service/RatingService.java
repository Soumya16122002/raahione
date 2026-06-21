package com.project.raahione.service;

import com.project.raahione.dto.RatingRequest;
import com.project.raahione.entity.Rating;
import com.project.raahione.entity.Ride;
import com.project.raahione.entity.User;
import com.project.raahione.repository.RatingRepository;
import com.project.raahione.repository.RideRepository;
import org.springframework.stereotype.Service;

@Service
public class RatingService {

    private final RatingRepository ratingRepository;
    private final RideRepository rideRepository;
    private final UserService userService;

    public RatingService(RatingRepository ratingRepository,
                         RideRepository rideRepository,
                         UserService userService) {

        this.ratingRepository = ratingRepository;
        this.rideRepository = rideRepository;
        this.userService = userService;
    }

    public Rating addRating(RatingRequest request) {

        User user =
                userService.getUserById(request.getUserId());

        Ride ride =
                rideRepository.findById(request.getRideId())
                        .orElseThrow(() ->
                                new RuntimeException("Ride not found"));

        Rating rating = new Rating();

        rating.setUser(user);
        rating.setRide(ride);
        rating.setRating(request.getRating());
        rating.setReview(request.getReview());

        return ratingRepository.save(rating);
    }
}