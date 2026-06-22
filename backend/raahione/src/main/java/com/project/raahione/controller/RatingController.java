package com.project.raahione.controller;

import com.project.raahione.dto.RatingRequest;
import com.project.raahione.entity.Rating;
import com.project.raahione.service.RatingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping
    public Rating addRating(
            @RequestBody RatingRequest request) {

        return ratingService.addRating(request);
    }
    @GetMapping("/ride/{rideId}")
    public List<Rating> getRatings(
            @PathVariable Long rideId
    ) {
        return ratingService.getRatings(rideId);
    }
    @GetMapping
    public List<Rating> getAllRatings() {
        return ratingService.getAllRatings();
    }
}