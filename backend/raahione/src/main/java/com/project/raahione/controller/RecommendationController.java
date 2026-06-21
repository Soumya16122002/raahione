package com.project.raahione.controller;

import com.project.raahione.dto.RecommendationRequest;
import com.project.raahione.entity.Ride;
import com.project.raahione.service.RecommendationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(
            RecommendationService recommendationService) {

        this.recommendationService = recommendationService;
    }

    @PostMapping
    public List<Ride> recommend(
            @RequestBody RecommendationRequest request) {

        return recommendationService.recommend(request);
    }
    @GetMapping("/{userId}/{source}")
    public List<Ride> recommend(
            @PathVariable Long userId,
            @PathVariable String source) {

        RecommendationRequest request =
                new RecommendationRequest();

        request.setUserId(userId);
        request.setCurrentSource(source);

        return recommendationService.recommend(request);
    }
}