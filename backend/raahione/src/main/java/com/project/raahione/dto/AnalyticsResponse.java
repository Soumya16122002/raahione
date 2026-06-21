package com.project.raahione.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnalyticsResponse {

    private long totalUsers;
    private long totalDrivers;
    private long totalRides;
    private long totalBookings;
}