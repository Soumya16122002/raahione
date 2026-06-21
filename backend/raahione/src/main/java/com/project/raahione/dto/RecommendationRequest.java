package com.project.raahione.dto;

public class RecommendationRequest {

    private Long userId;
    private String currentSource;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCurrentSource() {
        return currentSource;
    }

    public void setCurrentSource(String currentSource) {
        this.currentSource = currentSource;
    }
}