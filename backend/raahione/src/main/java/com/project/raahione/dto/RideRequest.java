package com.project.raahione.dto;

import lombok.Data;

@Data
public class RideRequest {

    private String source;
    private String destination;
    private String departureTime;
    private Integer availableSeats;
    private Long driverId;

    private String travelDate;
    private String travelTime;

}