package com.project.raahione.dto;

import lombok.Data;

@Data
public class RecommendationRequest {

    private Long userId;
    private String currentSource;
}