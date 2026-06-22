package com.project.raahione.dto;

import lombok.Data;

@Data
public class BookingRequest {

    private Long userId;
    private Long rideId;
    private Integer seatsBooked;
}