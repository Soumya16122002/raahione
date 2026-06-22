package com.project.raahione.dto;

import lombok.Data;

@Data
public class RatingRequest {

    private Long userId;
    private Long rideId;
    private Integer rating;
    private String review;
}